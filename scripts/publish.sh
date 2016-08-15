#!/bin/bash
cd public
git checkout gh-pages
git add -A
git commit -m "Update"
git push origin gh-pages
