#!/bin/bash
branch=$(git branch --show-current)
git push origin $branch
git push bitbucket $branch
