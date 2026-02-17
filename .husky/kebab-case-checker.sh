#!/bin/bash

Red='\033[0;31m'
Green='\033[0;32m'
Yellow='\033[0;33m'
Blue='\033[0;34m'
Reset='\033[0m'

echo -e "${Blue}Checking all changed Markdown and image files...${Reset}"

failure_flag=0


# Get staged files in relevant directories with relevant extensions
changed_files=$(git diff --cached --name-only --diff-filter=ACMR \
    | grep -E '\.(md|jpg|png|jpeg|svg)$' \
    | grep -E '^(docs|kb|community|roadmap|static|university|release-notes)/' || true)

if [ -z "$changed_files" ]; then
    echo -e "${Green}kebab-case check passed! No relevant files staged.${Reset}"
    exit 0
fi
# List changed files
echo -e "${Blue}Changed files:${Reset}"
i=1
while IFS= read -r file; do
    echo -e "${Yellow}$i. $file${Reset}"
    i=$((i+1))
done <<< "$changed_files"

# Check kebab-case filenames
invalid_kebab_case=$(echo "$changed_files" \
    | grep -vE '^([a-z0-9]+(-[a-z0-9]+)*)(/([a-z0-9]+(-[a-z0-9]+)*))*\.(md|jpg|png|jpeg|svg)$' || true)

if [ -n "$invalid_kebab_case" ]; then
    echo -e "${Blue}The following filenames are not in kebab-case:${Reset}"
    i=1
    while IFS= read -r file; do
        echo -e "${Red}$i. $file${Reset}"
        i=$((i+1))
    done <<< "$invalid_kebab_case"
    failure_flag=1
    echo -e "\n"
else
    echo -e "${Green}All filenames are in kebab-case.${Reset}"
fi

# Check for filenames exceeding 100 characters (basename only)
long_files=$(echo "$changed_files" | while IFS= read -r file; do basename "$file"; done | awk 'length($0) > 100')

if [ -n "$long_files" ]; then
    echo -e "${Blue}The following filenames exceed 100 characters:${Reset}"
    i=1
    while IFS= read -r file; do
        echo -e "${Red}$i. $file${Reset}"
        i=$((i+1))
    done <<< "$long_files"
    failure_flag=1
     echo -e "\n"
else
    echo -e "${Green}All filenames are of valid length.${Reset}"
fi

# Exit with appropriate status
if [ "$failure_flag" -eq 0 ]; then
    echo -e "${Green}kebab-case check passed!${Reset}"
    exit 0
else
    echo -e "${Red}kebab-case check failed.${Reset}"
    exit 1
fi
