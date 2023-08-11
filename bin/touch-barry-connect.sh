#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

date >> $SCRIPT_DIR/touch-barry.log
#NOTE: udev does not allow to make network requests, but trick with `su` allow to hack it.
su - eugeni -c 'curl http://localhost:8080/device/connected'  2>&1 >> $SCRIPT_DIR/touch-barry.log &
