#!/bin/bash
echo "fetch"
git fetch
echo "pull"
git pull
echo "add files"
git add --all
echo "You typed" $1
git commit -m "$1"
echo "push"
git push
echo "fetch"
git fetch
echo "pull"
git pull



