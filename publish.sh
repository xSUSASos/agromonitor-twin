#!/usr/bin/env bash
# Публикует эту папку на GitHub Pages: репозиторий agromonitor-twin на аккаунте, под которым выполнен вход в gh.
set -euo pipefail
cd "$(dirname "$0")"
OWNER="$(gh api user -q .login)"
rm -rf .git
git init -q -b main
git add -A
git commit -q -m "Цифровой двойник АгроМонитор: сборка"
gh repo create agromonitor-twin --public --source=. --push --description "Цифровой двойник АгроМонитор (демонстрационная сборка)"
gh api -X POST "repos/$OWNER/agromonitor-twin/pages" -f "source[branch]=main" -f "source[path]=/"
echo "Адрес через 1-2 минуты: https://$OWNER.github.io/agromonitor-twin/"
