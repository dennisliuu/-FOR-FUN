#!/bin/sh
HOST="140.124.13.11"
USER="t105360725"
PASSWD="1qaz@WSX"
# FILE="file.txt"
ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
cd public_html/Mcdonald
mput dist/*
quit
END_SCRIPT
