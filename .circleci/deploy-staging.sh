#!/usr/bin/env bash

cat >> ~/.ssh/config  << EOF
VerifyHostKeyDNS yes
StrictHostKeyChecking no
EOF

ssh -T policescorecard@apidev.policescorecard.org << EOF

echo -e "\n\033[38;5;34m✓ Police Scorecard › Starting Staging Deployment\033[0m\n"

export API_NODE_ENV=staging

echo -e "\n\033[38;5;34m✓ Police Scorecard › Updating Staging Repository\033[0m\n"

cd /var/www/apidev.policescorecard.org/html

git reset --hard
git stash
git checkout --force staging
git fetch
git pull

echo -e "\n\033[38;5;34m✓ Police Scorecard › Update NPM Packages\033[0m\n"

npm install --no-optional

echo -e "\n\033[38;5;34m✓ Police Scorecard › Migrate Database\033[0m\n"

npm run migrate

echo -e "\n\033[38;5;34m✓ Police Scorecard › Seed Database\033[0m\n"

npm run seed

echo -e "\n\033[38;5;34m✓ Police Scorecard › Update Elasticsearch\033[0m\n"

npm run elasticsearch:delete
npm run elasticsearch:create
npm run elasticsearch:update

echo -e "\n\033[38;5;34m✓ Police Scorecard › Generate Documentation\033[0m\n"

npm run docs:clean
npm run docs

echo -e "\n\033[38;5;34m✓ Police Scorecard › Staging Deployment Complete\033[0m\n"

EOF
