import { execSync } from 'child_process';

const files = [
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/login/page.tsx',
  'src/app/signup/page.tsx',
  'src/app/posts/page.tsx',
  'src/app/posts/[id]/page.tsx',
  'src/app/posts/[id]/edit/page.tsx',
  'src/app/posts/new/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/profile/edit/page.tsx',
  'src/app/store/authStore.ts',
  'src/components/NavBar.tsx',
  'src/components/PostListItem.tsx',
  'src/components/FilterBar.tsx',
  'src/components/FilterButton.tsx',
  'src/components/RecruitStatusBadge.tsx',
  'src/components/CommentSection.tsx',
  'src/components/AvatarDropdown.tsx',
  'src/components/PostFormFields.tsx',
  'src/components/Pagination.tsx',
  'src/components/ui/button.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/card.tsx',
  'src/components/auth/LoginForm.tsx',
  'src/components/auth/SignupForm.tsx',
  'src/components/auth/SocialButtons.tsx',
];

try {
  // Fetch latest from origin
  execSync('git fetch origin main', { stdio: 'inherit' });
  
  for (const file of files) {
    try {
      execSync(`git checkout origin/main -- ${file}`, { stdio: 'inherit' });
      console.log(`Restored: ${file}`);
    } catch (e) {
      console.log(`Skipped (not in origin/main): ${file}`);
    }
  }
  
  console.log('\nAll files restored to original main branch versions.');
} catch (err) {
  console.error('Error during restore:', err.message);
}
