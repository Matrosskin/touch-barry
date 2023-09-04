import {onCall, onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getDatabase} from "firebase-admin/database";

initializeApp();

interface IMachineTokenData {
  machine: string
  user: string
}

export const updateTouchBarryTunnel = onRequest(
  {region: "europe-west1"},
  async (request, response) => {
    if ("POST" !== request.method) {
      response.status(404).send("Page not found.");
      return;
    }

    const parsedBody = request.body;
    if (!parsedBody || !parsedBody.touchBarryMachineToken) {
      response.status(404).send("Page not found. [1]");
      return;
    }

    try {
      const db = getDatabase();
      const tokensRef = db.ref(`tokens/${parsedBody.touchBarryMachineToken}`);
      const tokenSnapshot = await tokensRef.once("value");
      if (!tokenSnapshot.exists()) {
        response.status(404).send("Page not found. [2]");
        return;
      }

      const tokenData: IMachineTokenData = tokenSnapshot.val();
      const machineRef = db
        .ref(`users/${tokenData.user}/machines/${tokenData.machine}`);

      const machineSnapshot = await machineRef.once("value");
      if (!machineSnapshot.exists()) {
        response.status(404).send("Page not found. [3]");
        return;
      }

      await machineRef.update({
        url: parsedBody.url,
        updatedAt: Date.now(),
      });

      response.send("OK");
    } catch (e) {
      response.status(404).send("Page not found. [-1]");
    }
  }
);

export const renewTouchBarryMachineToken = onCall(
  {region: "europe-west1"},
  async (request) => {
    if (!request.auth) return {error: "Not authorized."};
    if (!request.data?.machineKey) return {error: "No machine provided."};

    const db = getDatabase();
    const uid = request.auth.uid;
    const machineKey = request.data.machineKey;

    const machineRef = db.ref(`users/${uid}/machines/${machineKey}`);
    const machineSnapshot = await machineRef.once("value");
    if (!machineSnapshot.exists()) return {error: "Machine does not exists."};

    const tokensRef = db.ref("tokens");

    const tokenSnapshot = await tokensRef
      .orderByChild("machine").equalTo(machineKey).once("value");
    const removePromises: Promise<void>[] = [];
    tokenSnapshot.forEach((m) => {
      removePromises.push(m.ref.remove());
    });

    await Promise.all(removePromises);

    const newTokenRef = tokensRef.push();

    await newTokenRef.set({
      machine: machineKey,
      user: uid,
    });

    return {newToken: newTokenRef.key};
  }
);
