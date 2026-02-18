#!/bin/bash
# Restore all modified files to their original state from the main branch

git checkout origin/main -- \
  src/app/globals.css \
  src/app/layout.tsx \
  src/app/page.tsx \
  src/app/login/page.tsx \
  src/app/signup/page.tsx \
  src/app/posts/page.tsx \
  src/app/posts/new/page.tsx \
  src/app/posts/\[id\]/page.tsx \
  src/app/posts/\[id\]/edit/page.tsx \
  src/app/profile/page.tsx \
  src/app/profile/edit/page.tsx \
  src/app/store/authStore.ts \
  src/components/NavBar.tsx \
  src/components/PostListItem.tsx \
  src/components/FilterBar.tsx \
  src/components/FilterButton.tsx \
  src/components/RecruitStatusBadge.tsx \
  src/components/CommentSection.tsx \
  src/components/AvatarDropdown.tsx \
  src/components/PostFormFields.tsx \
  src/components/Pagination.tsx \
  src/components/ui/button.tsx \
  src/components/ui/input.tsx \
  src/components/ui/card.tsx \
  src/components/auth/LoginForm.tsx \
  src/components/auth/SignupForm.tsx \
  src/components/auth/SocialButtons.tsx

echo "All files restored to original version from main branch."
