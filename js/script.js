/* ============================================================
   GitMaster Pro — Complete JavaScript
   Author: Dr. Mohammad Arafah, University of Petra, Jordan
   ============================================================ */

// ==================== SECTION 1: GLOBAL STATE ====================
let currentLang = 'en';
let currentOS = 'windows';
let currentModule = null;
let currentQuizLevel = 'beginner';
let quizAnswered = {};
let quizScore = 0;
let quizTotal = 0;

// ==================== SECTION 16: UTILITY FUNCTIONS ====================
function generateHash() {
    return Math.random().toString(16).substring(2, 9);
}

function t(key) {
    const lang = translations[currentLang];
    if (!lang) return key;
    return lang[key] || translations['en'][key] || key;
}

function detectOS() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) return 'windows';
    if (ua.includes('mac')) return 'mac';
    return 'linux';
}

function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const orig = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerHTML = orig;
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        const orig = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.classList.add('copied');
        setTimeout(() => {
            button.innerHTML = orig;
            button.classList.remove('copied');
        }, 2000);
    });
}

// ==================== SECTION 2: TRANSLATIONS ====================
const translations = {
en: {
// Loader
'loader.text': 'Initializing GitMaster Pro...',
// Nav
'nav.brand': 'GitMaster Pro',
'nav.home': 'Home',
'nav.learn': 'Learn',
'nav.terminal': 'Terminal',
'nav.visualizer': 'Visualizer',
'nav.cheatsheet': 'Cheat Sheet',
'nav.quiz': 'Quiz',
'nav.langToggle': 'العربية',
// Hero
'hero.title': 'GitMaster Pro',
'hero.subtitle': 'Learn Git interactively. Practice commands, visualize workflows, and master version control.',
'hero.stat.modules': 'Modules',
'hero.stat.commands': 'Commands',
'hero.stat.os': 'OS Supported',
'hero.stat.languages': 'Languages',
'hero.badge': 'Interactive Git Learning Platform',
'hero.cta.start': 'Start Learning',
'hero.cta.terminal': 'Try Terminal',
'hero.cta.cheatsheet': 'Cheat Sheet',
// Features
'features.title': 'Why GitMaster Pro?',
'features.subtitle': 'Everything you need to master Git in one place',
'features.terminal.title': 'Interactive Terminal',
'features.terminal.desc': 'Practice Git commands in a safe, simulated terminal environment without affecting real repositories.',
'features.visualizer.title': 'Visual Git Graph',
'features.visualizer.desc': 'See your commits, branches, and merges come alive with real-time animated commit graph visualizations.',
'features.multios.title': 'Multi-OS Support',
'features.multios.desc': 'Tailored instructions for Windows, macOS, and Linux. Switch your OS and see platform-specific commands instantly.',
'features.vscode.title': 'VSCode Integration',
'features.vscode.desc': 'Learn how to leverage Git directly within Visual Studio Code with guided walkthroughs and tips.',
'features.bilingual.title': 'Bilingual Content',
'features.bilingual.desc': 'Full English and Arabic support with proper RTL layout, making Git accessible to a wider audience.',
'features.progress.title': 'Progress Tracking',
'features.progress.desc': 'Track your learning journey with completion indicators, quizzes, and achievement milestones.',
// Learning Path
'learning.title': 'Learning Path',
'learning.subtitle': 'Follow a structured curriculum from Git basics to advanced workflows',
'learning.filter.all': 'All',
'learning.filter.beginner': 'Beginner',
'learning.filter.intermediate': 'Intermediate',
'learning.filter.advanced': 'Advanced',
'learning.progress.title': 'Overall Progress',
// Module view
'module.back': '<i class="fa-solid fa-arrow-left"></i> Back to Modules',
'module.title': 'Module Title',
'module.progress': 'Progress: 0%',
'module.prev': 'Previous Module',
'module.next': 'Next Module',
'module.markComplete': 'Mark as Complete',
'module.completed': 'Completed',
'module.minutes': 'min',
'module.steps': 'steps',
'module.start': 'Start',
'module.continue': 'Continue',
'step.output': 'Output',
'step.run': 'Run',
'step.running': 'Running...',
'step.executed': 'Executed',
'step.vscode': 'VSCode',
'step.tip': 'Tip',
'step.warning': 'Warning',
'step.whatHappened': 'What Happened',
// Step explanations (what happened after running)
'mod1.s4.explain': 'Git printed its installed version. This confirms Git is properly installed on your system and ready to use.',
'mod2.s1.explain': 'The Git installer was downloaded. After running it, Git is now available as a command-line tool on your system.',
'mod2.s2.explain': 'Git confirmed its version number, proving the installation was successful.',
'mod2.s5.explain': 'VS Code was set as the default editor for Git. When Git needs you to type a message (e.g., during a merge), it will open VS Code.',
'mod3.s1.explain': 'Your name was saved in Git\'s global configuration. This name will appear in every commit you make, identifying you as the author.',
'mod3.s2.explain': 'Your email was saved in Git\'s global configuration. This email links your commits to your identity (e.g., your GitHub account).',
'mod3.s3.explain': 'The default branch name was set to "main". New repositories will now use "main" instead of the older "master" convention.',
'mod3.s4.explain': 'VS Code was configured as Git\'s default text editor for commit messages and interactive operations.',
'mod3.s5.explain': 'Colorized output was enabled. Git will now highlight changes, branches, and status information with colors for easier reading.',
'mod3.s6.explain': 'Git displayed all your current configuration settings, showing every option you\'ve configured globally and locally.',
'mod4.s1.explain': 'A new folder called "my-project" was created and you navigated into it. This will be the root of your Git project.',
'mod4.s2.explain': 'Git created a hidden .git folder inside your project. This folder stores all version history, branches, and configuration. Your folder is now a Git repository!',
'mod4.s3.explain': 'You inspected the .git directory structure. It contains: HEAD (current branch pointer), config, hooks, objects (stored data), and refs (branch/tag pointers).',
'mod4.s4.explain': 'A new README.md file was created with a project heading. This file is not yet tracked by Git — it exists only in your working directory.',
'mod4.s5.explain': 'Git status shows README.md as an "untracked file" in red. Git sees the file but is not tracking its changes yet. You need to use "git add" to start tracking it.',
'mod4.s6.explain': 'You reviewed the basic Git workflow: edit files → stage changes (git add) → commit snapshot (git commit). This cycle repeats for every change.',
'mod5.s1.explain': 'Git status revealed untracked files in your working directory. These files exist on disk but Git doesn\'t know about them yet.',
'mod5.s2.explain': 'README.md was moved from the working directory to the staging area. It\'s now queued up and ready to be included in the next commit.',
'mod5.s3.explain': 'The dot (.) tells Git to stage ALL changes — new files, modified files, and deleted files. Everything is now in the staging area.',
'mod5.s4.explain': 'Git status now shows README.md under "Changes to be committed" in green. The file has moved from untracked → staged, ready for commit.',
'mod5.s5.explain': 'A snapshot of your staged changes was saved permanently as a commit. The commit has a unique hash (a1b2c3d), your author info, and the message "Initial commit".',
'mod5.s6.explain': 'Git log shows the history of commits. You can see each commit\'s hash, author, date, and message. The --oneline flag shows a compact single-line format.',
'mod5.s7.explain': 'Three operations in one: the file was modified, staged with "git add", then committed. This is the standard edit-stage-commit workflow.',
'mod5.s8.explain': 'Git diff shows exactly what changed in your files line by line. Lines starting with + are additions, lines with - are removals. Green = added, Red = removed.',
'mod6.s1.explain': 'Git displayed the full commit history with detailed information: hash, author, date, and message for each commit, from newest to oldest.',
'mod6.s2.explain': 'The --graph flag shows branch structure visually with ASCII art. --oneline makes each commit one line. --all shows all branches, not just the current one.',
'mod6.s3.explain': 'Custom format strings let you control exactly what information appears. %h=short hash, %an=author name, %ar=relative date, %s=subject message.',
'mod6.s4.explain': 'Git show displays everything about a specific commit: the full diff of changes, author info, date, and commit message.',
'mod6.s5.explain': '"git diff" shows unstaged changes (working directory vs staging). "git diff --staged" shows staged changes (staging vs last commit). Together they cover all pending changes.',
'mod6.s6.explain': 'Git blame shows who last modified each line of a file, with the commit hash and date. Useful for understanding when and why a line was changed.',
'mod7.s2.explain': 'Git listed all local branches. The asterisk (*) marks the current active branch. Right now only "main" exists.',
'mod7.s3.explain': 'A new branch called "feature-login" was created pointing to the same commit as your current branch. No files changed — it\'s just a new pointer.',
'mod7.s4.explain': 'You switched to the "feature-login" branch. Your working directory now reflects this branch. Any new commits will be added to this branch, not main.',
'mod7.s5.explain': 'The -c flag creates and switches to a new branch in one command. "feature-signup" now exists and is your active branch.',
'mod7.s6.explain': 'A new file was created, staged, and committed — all on the feature-login branch. This commit only exists on this branch; main doesn\'t have it.',
'mod7.s7.explain': 'The branch was deleted. The -d flag only works if the branch has been fully merged. Use -D to force-delete an unmerged branch (careful — you\'ll lose unmerged commits).',
'mod8.s2.explain': 'You switched back to the main branch. Your working directory now reflects main\'s state — the feature files are temporarily hidden.',
'mod8.s3.explain': 'The feature-login branch was merged into main. "Fast-forward" means main simply moved its pointer forward to include the new commits — no merge commit needed.',
'mod8.s6.explain': 'The graph shows the merge history visually. You can see where the feature branch diverged and where it was merged back into main.',
'mod8.s7.explain': 'The feature branch was cleaned up after merging. It\'s good practice to delete branches after merging to keep the repository tidy.',
'mod9.s3.explain': 'A remote called "origin" was added, pointing to your GitHub repository URL. "origin" is the conventional name for your primary remote.',
'mod9.s4.explain': 'Git displayed the remote URLs for both fetch and push operations. This confirms your repository is linked to GitHub.',
'mod9.s5.explain': 'All local commits were uploaded to GitHub. The -u flag sets up tracking, so future "git push" commands automatically know where to push.',
'mod9.s6.explain': 'An SSH key pair was generated. The private key stays on your machine; the public key (.pub) gets added to GitHub for secure, password-free authentication.',
'mod9.s7.explain': 'The public SSH key was copied to your clipboard. You\'ll paste this into GitHub → Settings → SSH Keys to complete the authentication setup.',
'mod9.s8.explain': 'The entire remote repository was downloaded to your local machine, including all branches and commit history. A new folder was created with the project.',
'mod10.s1.explain': 'The remote repository was cloned to your local machine. You now have a full copy of the project with all its history.',
'mod10.s2.explain': 'Git downloaded the latest changes from the remote but did NOT apply them to your working files. The changes are stored in origin/main for you to review first.',
'mod10.s3.explain': 'Git pulled (fetched + merged) the latest changes from the remote into your local branch. Your working files are now up to date with the remote.',
'mod10.s5.explain': 'Your local commits were pushed to the remote repository. Other team members can now see and pull your changes.',
'mod10.s6.explain': 'Git listed all remote-tracking branches and set up tracking between your local main and origin/main for automatic push/pull.',
'mod11.s2.explain': 'Two branches modified the same file differently, causing a merge conflict. Git cannot automatically decide which version to keep — you must resolve it manually.',
'mod11.s3.explain': 'The conflict markers show both versions: <<<<<<< HEAD is your current branch, ======= separates them, and >>>>>>> branch-b is the incoming branch. You choose what to keep.',
'mod11.s4.explain': 'After manually editing the file to resolve the conflict (removing markers and keeping the desired content), "git add" marks the conflict as resolved.',
'mod11.s6.explain': 'The resolved file was committed, completing the merge. The merge conflict is now permanently resolved in the project history.',
'mod11.s7.explain': 'The merge was cancelled and everything was restored to the state before the merge started. Use this when you want to start over.',
'mod12.s2.explain': 'Rebase replayed your feature branch commits on top of the latest main. This creates a linear history without merge commits, making the log cleaner.',
'mod12.s4.explain': 'Interactive rebase shows the last 3 commits with options: pick (keep), reword (change message), squash (combine), fixup (combine silently), drop (remove).',
'mod12.s5.explain': 'Three commits were squashed into one clean commit. This is useful for combining "WIP" or "fix typo" commits before merging to main.',
'mod12.s7.explain': 'The rebase was aborted and your branch was restored to its state before the rebase started. No commits were lost.',
'mod13.s2.explain': 'Your uncommitted changes were saved to a temporary stash stack and your working directory was cleaned. You can now switch branches safely.',
'mod13.s3.explain': 'Git showed all saved stashes in a numbered list. Each entry shows the branch, commit, and optional message for that stash.',
'mod13.s4.explain': '"stash pop" restored your saved changes back to the working directory and removed the stash entry. Use "stash apply" instead to keep the stash for later.',
'mod13.s5.explain': 'The specified stash entry was permanently deleted from the stash list. The changes in that stash are now gone.',
'mod13.s7.explain': 'A specific commit from another branch was copied to your current branch. Unlike merge, cherry-pick only brings one commit — useful for hotfixes.',
'mod14.s1.explain': 'The file was restored to its last committed state. All uncommitted changes in the working directory were discarded — this cannot be undone!',
'mod14.s2.explain': 'The file was removed from the staging area back to the working directory. Your changes are still there, just no longer staged for commit.',
'mod14.s3.explain': 'The last commit was undone, but changes are kept in the staging area. You can edit and re-commit. The commit is gone from history, but no work is lost.',
'mod14.s4.explain': 'The last commit was undone and changes were moved back to the working directory (unstaged). You\'ll need to "git add" again before committing.',
'mod14.s5.explain': 'The last commit was completely erased — commit AND all changes are gone permanently. HEAD moved back one commit. This is destructive and cannot be undone!',
'mod14.s6.explain': 'A NEW commit was created that reverses the changes of the specified commit. Unlike reset, revert is safe because it preserves history — it adds, not removes.',
'mod14.s8.explain': 'Reflog shows every position HEAD has been at. Even after reset or rebase, you can find "lost" commits here and recover them within ~90 days.',
'mod15.s1.explain': 'A .gitignore file was created with rules to exclude: node_modules (dependencies), .env (secrets), *.log (logs), and dist (build output) from Git tracking.',
'mod15.s2.explain': 'A global .gitignore was configured. Patterns in this file apply to ALL your repositories — useful for OS files (.DS_Store) or IDE configs (.idea/).',
'mod15.s3.explain': 'A lightweight tag was created at the current commit. It\'s just a label — a named pointer to a specific commit. No additional metadata.',
'mod15.s4.explain': 'An annotated tag was created with a message. Annotated tags store the tagger name, date, and message — recommended for releases.',
'mod15.s5.explain': 'All local tags were pushed to the remote repository. Tags are not pushed by default with "git push" — you need --tags explicitly.',
'mod16.s4.explain': 'Three commits were created following Conventional Commits format: feat (new feature), fix (bug fix), docs (documentation). This format enables automated changelogs.',
// Terminal
'terminal.title': 'Interactive Git Terminal',
'terminal.subtitle': 'Practice Git commands in a safe, simulated environment',
'terminal.quickCommands': 'Quick Commands',
'terminal.help.text': '<i class="fa-solid fa-circle-info"></i> Type <code>help</code> to see all available commands, or click a quick command above to try it.',
'terminal.challenge': 'Challenge',
'terminal.state.branch': 'Branch',
'terminal.state.files': 'File Explorer',
'terminal.state.commits': 'Commits',
'terminal.state.noFiles': 'No files yet — try touch file.txt',
'terminal.state.noCommits': 'No commits yet',
'terminal.achievements': 'Achievements',
'terminal.history': 'History',
'terminal.history.empty': 'Commands will appear here...',
'terminal.export': 'Export .sh',
'terminal.reset': 'Reset',
'terminal.mistake.title': 'Common Mistake Detected',
'terminal.mistake.fix': 'Use this instead',
'terminal.ch.level.beginner': 'Beginner',
'terminal.ch.level.intermediate': 'Intermediate',
'terminal.ch.level.advanced': 'Advanced',
'terminal.ch.firstCommit': 'First Commit',
'terminal.ch.branching': 'Branch & Merge',
'terminal.ch.basicStatus': 'Status & Log',
'terminal.ch.remote': 'Remote Push',
'terminal.ch.stash': 'Stash Flow',
'terminal.ch.tagging': 'Tagging Releases',
'terminal.ch.diff': 'Diff & Inspect',
'terminal.ch.undo': 'Undo Changes',
'terminal.ch.cherryPick': 'Cherry Pick',
'terminal.ch.rebase': 'Rebase Flow',
'terminal.ch.started': 'Challenge started',
'terminal.ch.select': 'Select a challenge above to begin a guided exercise',
'terminal.ch.complete': 'Challenge Complete!',
'terminal.ch.nextChallenge': 'Next Challenge',
'terminal.ch.reset': 'Reset Progress',
'terminal.ch.step': 'Step',
'terminal.ch.firstCommit.desc': 'Learn the basic Git workflow: initialize a repo, create a file, stage it, and make your first commit.',
'terminal.ch.firstCommit.s1': 'Initialize a new Git repository',
'terminal.ch.firstCommit.s1.hint': 'git init',
'terminal.ch.firstCommit.s2': 'Create a README file for your project',
'terminal.ch.firstCommit.s2.hint': 'touch README.md',
'terminal.ch.firstCommit.s3': 'Stage the file so Git tracks it',
'terminal.ch.firstCommit.s3.hint': 'git add .',
'terminal.ch.firstCommit.s4': 'Commit the staged changes with a message',
'terminal.ch.firstCommit.s4.hint': 'git commit -m "Initial commit"',
'terminal.ch.branching.desc': 'Create a branch, make changes, switch back to main, and merge your work.',
'terminal.ch.branching.s1': 'Initialize a new Git repository',
'terminal.ch.branching.s1.hint': 'git init',
'terminal.ch.branching.s2': 'Create and switch to a new branch',
'terminal.ch.branching.s2.hint': 'git switch -c feature',
'terminal.ch.branching.s3': 'Create a file on your branch',
'terminal.ch.branching.s3.hint': 'touch feature.txt',
'terminal.ch.branching.s4': 'Stage the new file',
'terminal.ch.branching.s4.hint': 'git add .',
'terminal.ch.branching.s5': 'Commit changes on the branch',
'terminal.ch.branching.s5.hint': 'git commit -m "Add feature"',
'terminal.ch.branching.s6': 'Switch back to main branch',
'terminal.ch.branching.s6.hint': 'git switch main',
'terminal.ch.branching.s7': 'Merge the feature branch into main',
'terminal.ch.branching.s7.hint': 'git merge feature',
'terminal.ch.basicStatus.desc': 'Use git status and git log to understand the state of your repository at each step.',
'terminal.ch.basicStatus.s1': 'Initialize a new Git repository',
'terminal.ch.basicStatus.s1.hint': 'git init',
'terminal.ch.basicStatus.s2': 'Create a file',
'terminal.ch.basicStatus.s2.hint': 'touch index.html',
'terminal.ch.basicStatus.s3': 'Check the status — see untracked files',
'terminal.ch.basicStatus.s3.hint': 'git status',
'terminal.ch.basicStatus.s4': 'Stage the file',
'terminal.ch.basicStatus.s4.hint': 'git add .',
'terminal.ch.basicStatus.s5': 'Check status again — see staged changes',
'terminal.ch.basicStatus.s5.hint': 'git status',
'terminal.ch.basicStatus.s6': 'Commit the changes',
'terminal.ch.basicStatus.s6.hint': 'git commit -m "Add index"',
'terminal.ch.basicStatus.s7': 'View the commit history',
'terminal.ch.basicStatus.s7.hint': 'git log --oneline',
'terminal.ch.remote.desc': 'Set up a remote repository, create a commit, and push your work to the server.',
'terminal.ch.remote.s1': 'Initialize a new Git repository',
'terminal.ch.remote.s1.hint': 'git init',
'terminal.ch.remote.s2': 'Add a remote origin URL',
'terminal.ch.remote.s2.hint': 'git remote add origin https://...',
'terminal.ch.remote.s3': 'Create a file',
'terminal.ch.remote.s3.hint': 'touch app.js',
'terminal.ch.remote.s4': 'Stage all files',
'terminal.ch.remote.s4.hint': 'git add .',
'terminal.ch.remote.s5': 'Commit changes',
'terminal.ch.remote.s5.hint': 'git commit -m "First push"',
'terminal.ch.remote.s6': 'Push to the remote repository',
'terminal.ch.remote.s6.hint': 'git push -u origin main',
'terminal.ch.stash.desc': 'Save your uncommitted work temporarily with git stash, then restore it later.',
'terminal.ch.stash.s1': 'Initialize a repository and make a commit',
'terminal.ch.stash.s1.hint': 'git init',
'terminal.ch.stash.s2': 'Create and stage a file',
'terminal.ch.stash.s2.hint': 'touch file.txt',
'terminal.ch.stash.s3': 'Stage it',
'terminal.ch.stash.s3.hint': 'git add .',
'terminal.ch.stash.s4': 'Commit the file',
'terminal.ch.stash.s4.hint': 'git commit -m "Base commit"',
'terminal.ch.stash.s5': 'Modify or create another file',
'terminal.ch.stash.s5.hint': 'touch temp.txt',
'terminal.ch.stash.s6': 'Stash your uncommitted changes',
'terminal.ch.stash.s6.hint': 'git stash',
'terminal.ch.stash.s7': 'Restore the stashed changes',
'terminal.ch.stash.s7.hint': 'git stash pop',
'terminal.ch.tagging.desc': 'Learn to tag specific commits as release versions using lightweight and annotated tags.',
'terminal.ch.tagging.s1': 'Initialize a repository',
'terminal.ch.tagging.s1.hint': 'git init',
'terminal.ch.tagging.s2': 'Create a file and commit',
'terminal.ch.tagging.s2.hint': 'touch app.js',
'terminal.ch.tagging.s3': 'Stage and commit',
'terminal.ch.tagging.s3.hint': 'git add .',
'terminal.ch.tagging.s4': 'Commit the file',
'terminal.ch.tagging.s4.hint': 'git commit -m "v1 release"',
'terminal.ch.tagging.s5': 'Create a lightweight tag',
'terminal.ch.tagging.s5.hint': 'git tag v1.0',
'terminal.ch.tagging.s6': 'List all tags',
'terminal.ch.tagging.s6.hint': 'git tag',
'terminal.ch.diff.desc': 'Inspect changes in your working directory using git diff before and after staging.',
'terminal.ch.diff.s1': 'Initialize a repository',
'terminal.ch.diff.s1.hint': 'git init',
'terminal.ch.diff.s2': 'Create a file and commit it',
'terminal.ch.diff.s2.hint': 'touch style.css',
'terminal.ch.diff.s3': 'Stage and commit',
'terminal.ch.diff.s3.hint': 'git add .',
'terminal.ch.diff.s4': 'Commit the file',
'terminal.ch.diff.s4.hint': 'git commit -m "Add styles"',
'terminal.ch.diff.s5': 'Modify the file (simulate)',
'terminal.ch.diff.s5.hint': 'echo "body{}" >> style.css',
'terminal.ch.diff.s6': 'View the diff of unstaged changes',
'terminal.ch.diff.s6.hint': 'git diff',
'terminal.ch.diff.s7': 'Stage and commit the changes',
'terminal.ch.diff.s7.hint': 'git add .',
'terminal.ch.diff.s8': 'Commit the update',
'terminal.ch.diff.s8.hint': 'git commit -m "Update styles"',
'terminal.ch.undo.desc': 'Learn to undo commits using git reset and check the result with git status.',
'terminal.ch.undo.s1': 'Initialize a repository',
'terminal.ch.undo.s1.hint': 'git init',
'terminal.ch.undo.s2': 'Create a file',
'terminal.ch.undo.s2.hint': 'touch main.js',
'terminal.ch.undo.s3': 'Stage the file',
'terminal.ch.undo.s3.hint': 'git add .',
'terminal.ch.undo.s4': 'Commit',
'terminal.ch.undo.s4.hint': 'git commit -m "Add main"',
'terminal.ch.undo.s5': 'View commit history',
'terminal.ch.undo.s5.hint': 'git log --oneline',
'terminal.ch.undo.s6': 'Undo the last commit (keep changes staged)',
'terminal.ch.undo.s6.hint': 'git reset --soft HEAD~1',
'terminal.ch.undo.s7': 'Check status to confirm',
'terminal.ch.undo.s7.hint': 'git status',
'terminal.ch.cherryPick.desc': 'Apply a specific commit from one branch to another using cherry-pick.',
'terminal.ch.cherryPick.s1': 'Initialize a repository',
'terminal.ch.cherryPick.s1.hint': 'git init',
'terminal.ch.cherryPick.s2': 'Create a file and commit on main',
'terminal.ch.cherryPick.s2.hint': 'touch base.txt',
'terminal.ch.cherryPick.s3': 'Stage and commit',
'terminal.ch.cherryPick.s3.hint': 'git add .',
'terminal.ch.cherryPick.s4': 'Commit',
'terminal.ch.cherryPick.s4.hint': 'git commit -m "Base"',
'terminal.ch.cherryPick.s5': 'Create and switch to a feature branch',
'terminal.ch.cherryPick.s5.hint': 'git switch -c feature',
'terminal.ch.cherryPick.s6': 'Create a file and commit on the feature branch',
'terminal.ch.cherryPick.s6.hint': 'touch feature.txt',
'terminal.ch.cherryPick.s7': 'Stage and commit',
'terminal.ch.cherryPick.s7.hint': 'git add .',
'terminal.ch.cherryPick.s8': 'Commit on feature',
'terminal.ch.cherryPick.s8.hint': 'git commit -m "Feature work"',
'terminal.ch.cherryPick.s9': 'Switch back to main',
'terminal.ch.cherryPick.s9.hint': 'git switch main',
'terminal.ch.cherryPick.s10': 'Cherry-pick the feature commit',
'terminal.ch.cherryPick.s10.hint': 'git cherry-pick <hash>',
'terminal.ch.rebase.desc': 'Rewrite commit history by rebasing one branch onto another for a cleaner log.',
'terminal.ch.rebase.s1': 'Initialize a repository and make a base commit',
'terminal.ch.rebase.s1.hint': 'git init',
'terminal.ch.rebase.s2': 'Create and commit a file',
'terminal.ch.rebase.s2.hint': 'touch base.txt',
'terminal.ch.rebase.s3': 'Stage and commit',
'terminal.ch.rebase.s3.hint': 'git add .',
'terminal.ch.rebase.s4': 'Commit',
'terminal.ch.rebase.s4.hint': 'git commit -m "Base"',
'terminal.ch.rebase.s5': 'Create a feature branch',
'terminal.ch.rebase.s5.hint': 'git switch -c feature',
'terminal.ch.rebase.s6': 'Make a commit on the feature branch',
'terminal.ch.rebase.s6.hint': 'touch feature.txt',
'terminal.ch.rebase.s7': 'Stage and commit on feature',
'terminal.ch.rebase.s7.hint': 'git add .',
'terminal.ch.rebase.s8': 'Commit',
'terminal.ch.rebase.s8.hint': 'git commit -m "Feature"',
'terminal.ch.rebase.s9': 'Rebase feature onto main',
'terminal.ch.rebase.s9.hint': 'git rebase main',
'ach.firstInit': 'First Init',
'ach.firstFile': 'File Creator',
'ach.firstStage': 'First Stage',
'ach.firstCommit': 'First Commit',
'ach.fiveCommits': 'On Fire',
'ach.branchCreate': 'Branch Out',
'ach.branchMerge': 'Merge Master',
'ach.remoteSetup': 'Connected',
'ach.stashUse': 'Stash Pro',
'ach.tenCmds': 'Power User',
'ach.tagCreate': 'Tag It',
'ach.challengeComplete': 'Challenger',
// Visualizer
'visualizer.title': 'Git Workflow Visualizer',
'visualizer.subtitle': 'Watch Git operations come to life with animated commit graphs',
'visualizer.btn.init': '<i class="fa-solid fa-play"></i> Init',
'visualizer.btn.commit': '<i class="fa-solid fa-circle-check"></i> Commit',
'visualizer.btn.branch': '<i class="fa-solid fa-code-branch"></i> Branch',
'visualizer.btn.merge': '<i class="fa-solid fa-code-merge"></i> Merge',
'visualizer.btn.reset': '<i class="fa-solid fa-rotate-left"></i> Reset',
'visualizer.btn.clear': '<i class="fa-solid fa-trash"></i> Clear',
'visualizer.info.default': '<i class="fa-solid fa-circle-info"></i> Click <strong>Init</strong> to initialize a new repository and start visualizing Git operations.',
'viz.area.working': 'Working Directory',
'viz.area.staging': 'Staging Area',
'viz.area.local': 'Local Repository',
'viz.area.remote': 'Remote',
'viz.nextsteps': 'Suggested Next Steps',
'viz.diagram': 'Visual Flow',
'viz.commit.branch': 'Branch:',
'viz.commit.message': 'Message:',
'viz.next.addFile': 'Stage your changes with git add',
'viz.next.commit': 'Commit your staged changes',
'viz.next.createBranch': 'Create a new branch for a feature',
'viz.next.push': 'Push changes to the remote repository',
'viz.next.moreCommits': 'Continue making commits',
'viz.next.commitBranch': 'Add commits to the {branch} branch',
'viz.next.switchBranch': 'Switch between branches with git switch',
'viz.next.mergeLater': 'Merge the branch back when ready',
'viz.next.deleteBranch': 'Clean up by deleting the merged branch',
'viz.next.newFeature': 'Start a new feature branch',
'viz.practices.title': 'Best Practices & Common Pitfalls',
'viz.practices.best': 'Best Practices',
'viz.practices.pitfalls': 'Common Pitfalls',
'viz.bp1.title': 'Write meaningful commit messages',
'viz.bp1.good': 'git commit -m "fix: resolve login timeout on slow networks"',
'viz.bp1.bad': 'git commit -m "fixed stuff"',
'viz.bp1.why': 'Clear messages help teammates understand changes without reading code.',
'viz.bp2.title': 'Commit often, push regularly',
'viz.bp2.good': 'Small focused commits: one feature or fix per commit',
'viz.bp2.bad': 'One massive commit with 50 changed files',
'viz.bp2.why': 'Small commits are easier to review, revert, and bisect.',
'viz.bp3.title': 'Always pull before pushing',
'viz.bp3.good': 'git pull origin main → resolve conflicts → git push',
'viz.bp3.bad': 'git push (rejected because remote has changes)',
'viz.bp3.why': 'Avoids merge conflicts and rejected pushes.',
'viz.bp4.title': 'Use branches for features',
'viz.bp4.good': 'git switch -c feature/user-auth → work → merge → delete branch',
'viz.bp4.bad': 'Committing everything directly on main',
'viz.bp4.why': 'Branches isolate work and enable code review via pull requests.',
'viz.bp5.title': 'Never force push to shared branches',
'viz.bp5.good': 'git push (normal push, or --force-with-lease on your own branch)',
'viz.bp5.bad': 'git push --force origin main',
'viz.bp5.why': 'Force push overwrites history — other developers lose their work.',
'viz.bp6.title': 'Review changes before committing',
'viz.bp6.good': 'git diff --staged → review → git commit',
'viz.bp6.bad': 'git add . && git commit -m "done" (without checking)',
'viz.bp6.why': 'Prevents accidentally committing debug code, secrets, or unfinished work.',
// Cheatsheet
'cheatsheet.title': 'Git Cheat Sheet',
'cheatsheet.subtitle': 'Quick reference for the most commonly used Git commands',
'cheatsheet.searchPlaceholder': 'Search commands...',
// Quiz
'quiz.title': 'Test Your Knowledge',
'quiz.subtitle': 'Challenge yourself with Git quizzes at various difficulty levels',
'quiz.level.beginner': '<i class="fa-solid fa-seedling"></i> Beginner',
'quiz.level.intermediate': '<i class="fa-solid fa-tree"></i> Intermediate',
'quiz.level.advanced': '<i class="fa-solid fa-mountain"></i> Advanced',
'quiz.score': 'Score:',
'quiz.result.title': 'Quiz Complete!',
'quiz.result.retry': '<i class="fa-solid fa-rotate"></i> Try Again',
'quiz.result.perfect': 'Perfect score! You are a Git master!',
'quiz.result.great': 'Great job! You have a solid understanding of Git.',
'quiz.result.good': 'Good effort! Review the topics you missed and try again.',
'quiz.result.retry_msg': 'Keep practicing! Review the modules and try again.',
// Workflows
'workflows.title': 'Git Workflows & Strategies',
'workflows.subtitle': 'Explore popular branching strategies used by development teams worldwide',
'workflows.tab.gitflow': '<i class="fa-solid fa-code-branch"></i> GitFlow',
'workflows.tab.githubflow': '<i class="fa-brands fa-github"></i> GitHub Flow',
'workflows.tab.trunk': '<i class="fa-solid fa-timeline"></i> Trunk-Based',
'workflows.gitflow.title': 'GitFlow Workflow',
'workflows.gitflow.desc': 'GitFlow is a branching model that uses two main long-lived branches (main and develop) along with supporting branches (feature, release, hotfix). It is well-suited for projects with scheduled release cycles.',
'workflows.githubflow.title': 'GitHub Flow',
'workflows.githubflow.desc': 'GitHub Flow is a simplified workflow centered around the main branch. Developers create feature branches, open pull requests, receive code reviews, and merge back to main. It emphasizes continuous deployment.',
'workflows.trunk.title': 'Trunk-Based Development',
'workflows.trunk.desc': 'Trunk-Based Development is a strategy where developers commit small, frequent changes directly to the main branch (trunk) or via very short-lived feature branches. It minimizes merge conflicts and supports continuous integration.',
// Footer
'footer.brand': 'GitMaster Pro',
'footer.description': 'A comprehensive, interactive Git tutorial designed to take you from a complete beginner to a confident Git user. Built with passion for education and open-source.',
'footer.quickLinks': 'Quick Links',
'footer.createdBy': 'Created By',
'footer.author.name': 'Dr. Mohammad Arafah',
'footer.author.title': 'Assistant Professor',
'footer.author.university': 'University of Petra, Jordan',
'footer.author.portfolio': 'Portfolio',
'footer.copyright': '© 2026 GitMaster Pro. All rights reserved.',
'footer.powered': 'Powered by GitMaster Pro',
// Modal
'modal.title': 'Command Details',
'modal.close': 'Close',
'modal.tryIt': '<i class="fa-solid fa-terminal"></i> Try in Terminal',
// Module titles and descriptions
'mod1.title': 'What is Git? Introduction to Version Control',
'mod1.desc': 'Learn what version control is, why Git is the industry standard, and understand core concepts like repositories, commits, and branches.',
'mod2.title': 'Installing Git & Setting Up VSCode',
'mod2.desc': 'Install Git on your operating system and configure Visual Studio Code as your primary Git editor with essential extensions.',
'mod3.title': 'Git Configuration',
'mod3.desc': 'Configure Git with your identity, preferred editor, default branch name, and other essential settings.',
'mod4.title': 'Your First Repository',
'mod4.desc': 'Create your first Git repository, understand the .git directory structure, and learn about the staging area.',
'mod5.title': 'Basic Workflow — add, commit, status',
'mod5.desc': 'Master the fundamental Git workflow: staging changes, creating commits, and viewing your project history.',
'mod6.title': 'Viewing History & Understanding Changes',
'mod6.desc': 'Explore powerful Git log options, compare differences between commits, and trace changes in your codebase.',
'mod7.title': 'Branching',
'mod7.desc': 'Understand branching concepts, create and switch branches, and organize your development workflow.',
'mod8.title': 'Merging Branches',
'mod8.desc': 'Learn fast-forward and three-way merges, view merge history, and clean up merged branches.',
'mod9.title': 'Remote Repositories & GitHub',
'mod9.desc': 'Connect your local repository to GitHub, push and pull changes, and set up SSH authentication.',
'mod10.title': 'Collaboration',
'mod10.desc': 'Clone repositories, fetch and pull remote changes, track remote branches, and work with pull requests.',
'mod11.title': 'Resolving Merge Conflicts',
'mod11.desc': 'Understand what causes merge conflicts, identify conflict markers, and resolve conflicts manually and in VSCode.',
'mod12.title': 'Rebasing',
'mod12.desc': 'Learn the difference between rebase and merge, perform interactive rebases, squash commits, and understand the golden rule.',
'mod13.title': 'Stashing & Cherry-Picking',
'mod13.desc': 'Save work-in-progress with stash, manage multiple stashes, and selectively apply commits with cherry-pick.',
'mod14.title': 'Undoing Changes',
'mod14.desc': 'Master various ways to undo changes: restore, reset (soft/mixed/hard), revert, and recover lost commits with reflog.',
'mod15.title': 'Tags, Releases & .gitignore',
'mod15.desc': 'Create .gitignore files, tag releases with lightweight and annotated tags, and publish GitHub releases.',
'mod16.title': 'Professional Workflows',
'mod16.desc': 'Explore GitFlow, GitHub Flow, and Trunk-Based Development. Learn commit conventions, branch protection, and code review.',

// Module 1 steps
'mod1.s1.title': 'What is Version Control?',
'mod1.s1.desc': 'Version Control Systems (VCS) track changes to files over time, allowing you to recall specific versions later. Think of it as an unlimited undo system for your entire project. Without VCS, developers often resort to copying folders (project-v1, project-v2, project-final, project-final-FINAL), which is error-prone and unscalable.',
'mod1.s2.title': 'Why Git?',
'mod1.s2.desc': 'Git is a distributed version control system, meaning every developer has a full copy of the repository history. Unlike centralized systems (SVN, CVS), Git does not depend on a central server. It is fast, supports non-linear development through branching, and is the industry standard used by millions of developers worldwide.',
'mod1.s3.title': 'Key Git Concepts',
'mod1.s3.desc': 'Repository (repo): A directory tracked by Git containing all project files and history. Commit: A snapshot of your project at a point in time. Branch: An independent line of development. Staging Area (Index): A preparation zone where you decide which changes to include in the next commit.',
'mod1.s4.title': 'Verify Git Installation',
'mod1.s4.desc': 'Before we begin, let us verify that Git is installed on your system. Run the following command in your terminal. If Git is installed, you will see the version number.',
'mod1.s4.vscode': 'In VSCode, open the integrated terminal with Ctrl+` (backtick). Type the command there to check your Git version.',
'mod1.s4.tip': 'If you see "command not found", Git is not installed yet. Proceed to Module 2 for installation instructions.',

// Module 2 steps
'mod2.s1.title': 'Install Git on Your OS',
'mod2.s1.desc': 'Download and install Git for your operating system. The installation process varies by platform.',
'mod2.s1.vscode': 'After installing Git, restart VSCode so it detects the new Git installation automatically.',
'mod2.s1.tip': 'On Windows, during installation, select "Git from the command line and also from 3rd-party software" for best compatibility.',
'mod2.s2.title': 'Verify Installation',
'mod2.s2.desc': 'After installation, verify Git is properly installed by checking its version.',
'mod2.s3.title': 'Install Visual Studio Code',
'mod2.s3.desc': 'Download VSCode from code.visualstudio.com. It is a free, open-source code editor with excellent built-in Git support.',
'mod2.s3.tip': 'VSCode is available for Windows, macOS, and Linux. Choose the installer for your operating system.',
'mod2.s4.title': 'Install Git Extensions in VSCode',
'mod2.s4.desc': 'Enhance your Git experience in VSCode by installing these essential extensions: GitLens (provides rich Git blame annotations, history, and more) and Git Graph (visualizes your repository commit history as a graph).',
'mod2.s4.vscode': 'Open the Extensions panel (Ctrl+Shift+X), search for "GitLens" and "Git Graph", then click Install on each.',
'mod2.s5.title': 'Configure VSCode as Git Editor',
'mod2.s5.desc': 'Set VSCode as your default Git editor. The --wait flag tells Git to wait until you close the file in VSCode before continuing.',

// Module 3 steps
'mod3.s1.title': 'Set Your Name',
'mod3.s1.desc': 'Git uses your name and email to identify who made each commit. Set your name with the following command. The --global flag applies this setting to all repositories on your machine.',
'mod3.s1.tip': 'Use your real name as it will appear in all your commits and be visible to collaborators.',
'mod3.s2.title': 'Set Your Email',
'mod3.s2.desc': 'Set the email address that will be associated with your Git commits. Use the same email you plan to use with GitHub.',
'mod3.s2.tip': 'If you want to keep your email private on GitHub, use the noreply email GitHub provides in your settings.',
'mod3.s3.title': 'Set Default Branch Name',
'mod3.s3.desc': 'By default, Git creates a branch called "master" when you initialize a repository. The industry has shifted to using "main" as the default branch name.',
'mod3.s3.tip': 'GitHub, GitLab, and Bitbucket all default to "main" for new repositories.',
'mod3.s4.title': 'Set Default Editor',
'mod3.s4.desc': 'Configure Git to use VSCode as the default editor for commit messages, interactive rebases, and other text editing tasks.',
'mod3.s4.vscode': 'The --wait flag tells the terminal to pause until you close the file tab in VSCode.',
'mod3.s5.title': 'Enable Color Output',
'mod3.s5.desc': 'Enable colored output in Git commands to make terminal output easier to read. Colors help distinguish between different types of information.',
'mod3.s6.title': 'View All Configuration',
'mod3.s6.desc': 'Review all your Git configuration settings to verify everything is set up correctly.',
'mod3.s6.tip': 'Settings are stored in three levels: system (/etc/gitconfig), global (~/.gitconfig), and local (.git/config). Local overrides global, which overrides system.',

// Module 4 steps
'mod4.s1.title': 'Create Project Directory',
'mod4.s1.desc': 'Start by creating a new directory for your project and navigate into it.',
'mod4.s2.title': 'Initialize Git Repository',
'mod4.s2.desc': 'Turn the directory into a Git repository. This creates a hidden .git folder that contains all the tracking information.',
'mod4.s2.vscode': 'In VSCode, you can also initialize a repository by opening the Source Control panel (Ctrl+Shift+G) and clicking "Initialize Repository".',
'mod4.s2.tip': 'You only need to run git init once per project. Running it again in an existing repo will not overwrite anything.',
'mod4.s3.title': 'Explore the .git Directory',
'mod4.s3.desc': 'The .git directory is where Git stores all the metadata and object database for your repository. Let us look inside.',
'mod4.s3.tip': 'Never manually modify files inside .git unless you know exactly what you are doing. Corruption of these files can destroy your repository history.',
'mod4.s4.title': 'Create Your First File',
'mod4.s4.desc': 'Create a README.md file to serve as the introduction to your project.',
'mod4.s5.title': 'Check Repository Status',
'mod4.s5.desc': 'Use git status to see the current state of your working directory and staging area. It shows which files are tracked, modified, or staged.',
'mod4.s5.vscode': 'VSCode shows file status in the Source Control panel and in the file explorer with colored letters: U (Untracked), M (Modified), A (Added).',
'mod4.s6.title': 'Understanding the Staging Area',
'mod4.s6.desc': 'Git uses a three-area architecture: Working Directory (where you edit files), Staging Area/Index (where you prepare commits), and Repository (where commits are stored permanently). This gives you fine-grained control over what goes into each commit.',
'mod4.s6.tip': 'Think of the staging area as a shopping cart. You add items (changes) to the cart, review them, and then checkout (commit) when ready.',

// Module 5 steps
'mod5.s1.title': 'Check Status',
'mod5.s1.desc': 'Always start by checking the status of your repository. This shows untracked files, modified files, and staged changes.',
'mod5.s2.title': 'Stage a Single File',
'mod5.s2.desc': 'Add a specific file to the staging area. This tells Git you want to include this file in your next commit.',
'mod5.s2.vscode': 'In VSCode, click the + icon next to a file in the Source Control panel to stage it.',
'mod5.s3.title': 'Stage Multiple Files',
'mod5.s3.desc': 'You can stage multiple files at once by listing them, or use "git add ." to stage all changes in the current directory.',
'mod5.s3.tip': 'Use "git add ." with caution — it stages everything. Make sure you are not accidentally staging files you do not want to commit.',
'mod5.s3.warning': 'Be careful with "git add ." — it will stage ALL changes including files you might not want to commit. Always run git status first.',
'mod5.s4.title': 'Check Status After Staging',
'mod5.s4.desc': 'After staging, run git status again. Staged files appear in green under "Changes to be committed".',
'mod5.s5.title': 'Create Your First Commit',
'mod5.s5.desc': 'A commit creates a snapshot of all staged changes. The -m flag lets you write a commit message inline.',
'mod5.s5.vscode': 'In VSCode, type your commit message in the text box at the top of the Source Control panel and click the checkmark (or press Ctrl+Enter) to commit.',
'mod5.s5.tip': 'Write meaningful commit messages. A good format: "Add user authentication feature" — start with a verb, be specific.',
'mod5.s6.title': 'View Commit History',
'mod5.s6.desc': 'View the log of all commits. The --oneline flag shows a condensed view with just the hash and message.',
'mod5.s7.title': 'Make Changes and Commit Again',
'mod5.s7.desc': 'Modify an existing file, stage the changes, and create a new commit. This is the core Git workflow you will repeat constantly.',
'mod5.s8.title': 'View Differences',
'mod5.s8.desc': 'Use git diff to see exactly what changed in your files. Without flags, it shows unstaged changes. Use --staged to see staged changes.',
'mod5.s8.vscode': 'VSCode shows diffs inline in the editor. Click on a modified file in Source Control to see a side-by-side diff view.',

// Module 6 steps
'mod6.s1.title': 'Full Git Log',
'mod6.s1.desc': 'The default git log shows detailed information for each commit: hash, author, date, and message.',
'mod6.s2.title': 'Compact Log',
'mod6.s2.desc': 'Use flags to create a compact, visual representation of your commit history with branch graph.',
'mod6.s2.tip': 'Create an alias for this: git config --global alias.lg "log --oneline --graph --all"',
'mod6.s3.title': 'Custom Log Format',
'mod6.s3.desc': 'Git log supports custom formatting with placeholders: %h (short hash), %an (author name), %ar (relative date), %s (subject).',
'mod6.s4.title': 'View a Specific Commit',
'mod6.s4.desc': 'Use git show to see the full details of a specific commit, including the diff of changes made.',
'mod6.s5.title': 'Compare Changes',
'mod6.s5.desc': 'Use git diff to compare changes. Without arguments it shows unstaged changes. Use --staged (or --cached) to see staged changes ready for commit.',
'mod6.s5.vscode': 'In VSCode, the Git panel shows changes inline. You can also use the "Compare with Previous" command from the Command Palette.',
'mod6.s6.title': 'File Blame',
'mod6.s6.desc': 'Git blame shows who last modified each line of a file and in which commit. This is invaluable for understanding code history.',
'mod6.s6.vscode': 'The GitLens extension adds inline blame annotations directly in your editor, showing who changed each line and when.',

// Module 7 steps
'mod7.s1.title': 'What Are Branches?',
'mod7.s1.desc': 'A branch in Git is simply a lightweight pointer to a commit. Branches let you diverge from the main line of development to work on features, fixes, or experiments independently. The default branch is typically called "main".',
'mod7.s2.title': 'List Branches',
'mod7.s2.desc': 'View all local branches in your repository. The current branch is highlighted with an asterisk (*).',
'mod7.s3.title': 'Create a New Branch',
'mod7.s3.desc': 'Create a new branch pointing to the current commit. This does not switch to the new branch — you remain on your current branch.',
'mod7.s4.title': 'Switch to a Branch',
'mod7.s4.desc': 'Switch your working directory to the specified branch. Git updates your files to match the branch tip. The modern command is "git switch", though "git checkout" also works.',
'mod7.s4.tip': 'The "git switch" command was introduced in Git 2.23 as a clearer alternative to "git checkout" for branch switching.',
'mod7.s5.title': 'Create and Switch in One Command',
'mod7.s5.desc': 'Use the -c flag with git switch (or -b with git checkout) to create a new branch and switch to it in a single command.',
'mod7.s6.title': 'Work on a Branch',
'mod7.s6.desc': 'Once on a feature branch, make your changes, stage them, and commit. These commits exist only on this branch until you merge.',
'mod7.s6.vscode': 'The current branch name is shown in the bottom-left corner of VSCode. Click it to switch branches or create new ones.',
'mod7.s7.title': 'Delete a Branch',
'mod7.s7.desc': 'After merging a branch, delete it to keep your repository clean. Use -d for a safe delete (only works if merged) or -D to force delete.',
'mod7.s7.warning': 'Using -D (uppercase) force-deletes the branch even if it has unmerged changes. Use -d (lowercase) for safety.',

// Module 8 steps
'mod8.s1.title': 'What is Merging?',
'mod8.s1.desc': 'Merging integrates changes from one branch into another. Git supports two main types: fast-forward merge (when the target branch has no new commits) and three-way merge (when both branches have diverged).',
'mod8.s2.title': 'Switch to Target Branch',
'mod8.s2.desc': 'Before merging, switch to the branch you want to merge INTO (usually main).',
'mod8.s3.title': 'Merge a Branch',
'mod8.s3.desc': 'Merge the feature branch into your current branch. Git will automatically determine the best merge strategy.',
'mod8.s3.vscode': 'In VSCode, use the Command Palette (Ctrl+Shift+P) and search for "Git: Merge Branch" to merge visually.',
'mod8.s4.title': 'Fast-Forward Merge',
'mod8.s4.desc': 'A fast-forward merge occurs when the target branch has no new commits since the feature branch was created. Git simply moves the branch pointer forward — no new merge commit is created.',
'mod8.s5.title': 'Three-Way Merge',
'mod8.s5.desc': 'A three-way merge occurs when both branches have diverged (both have new commits). Git creates a new merge commit that has two parents, combining the changes from both branches.',
'mod8.s6.title': 'View Merge History',
'mod8.s6.desc': 'Visualize the merge history with a graph. The --graph flag shows branch and merge connections.',
'mod8.s7.title': 'Delete Merged Branch',
'mod8.s7.desc': 'After a successful merge, the feature branch is no longer needed. Delete it to keep your branch list clean.',

// Module 9 steps
'mod9.s1.title': 'What Are Remote Repositories?',
'mod9.s1.desc': 'A remote repository is a version of your project hosted on the internet or a network. It allows collaboration: multiple developers can push and pull changes. GitHub, GitLab, and Bitbucket are popular hosting services.',
'mod9.s2.title': 'Create a GitHub Repository',
'mod9.s2.desc': 'Go to github.com, click "New repository", give it a name, choose public or private, and click "Create repository". Do NOT initialize with a README if you already have a local repo.',
'mod9.s2.tip': 'If you already have a local repository with commits, do not add a README, .gitignore, or license on GitHub — it creates conflicts.',
'mod9.s3.title': 'Add Remote Origin',
'mod9.s3.desc': 'Link your local repository to the remote GitHub repository. "origin" is the conventional name for your primary remote.',
'mod9.s4.title': 'Verify Remote',
'mod9.s4.desc': 'Check that your remote was added correctly. The -v flag shows both fetch and push URLs.',
'mod9.s5.title': 'Push to Remote',
'mod9.s5.desc': 'Upload your local commits to the remote repository. The -u flag sets up tracking so future pushes only need "git push".',
'mod9.s5.tip': 'The -u (or --set-upstream) flag creates a tracking relationship. After this, you can simply use "git push" and "git pull".',
'mod9.s6.title': 'Set Up SSH Key',
'mod9.s6.desc': 'SSH keys provide a secure way to authenticate with GitHub without entering your password each time. Generate an SSH key pair.',
'mod9.s6.tip': 'Ed25519 is the recommended algorithm. When prompted, press Enter to accept the default file location and optionally set a passphrase.',
'mod9.s7.title': 'Add SSH Key to GitHub',
'mod9.s7.desc': 'Copy your public key and add it to your GitHub account. Go to GitHub Settings > SSH and GPG Keys > New SSH Key, paste the key, and save.',
'mod9.s8.title': 'Clone a Repository',
'mod9.s8.desc': 'Clone creates a full copy of a remote repository on your local machine, including all history and branches.',
'mod9.s8.vscode': 'In VSCode, press Ctrl+Shift+P, type "Git: Clone", paste the repository URL, and choose a local folder.',

// Module 10 steps
'mod10.s1.title': 'Clone a Repository',
'mod10.s1.desc': 'Start by cloning an existing repository to work on. This creates a local copy with the full commit history and sets up the remote tracking automatically.',
'mod10.s2.title': 'Fetch Remote Changes',
'mod10.s2.desc': 'Fetch downloads new data from the remote repository but does NOT modify your working directory. It updates your remote-tracking branches.',
'mod10.s3.title': 'Pull Remote Changes',
'mod10.s3.desc': 'Pull is a combination of fetch + merge. It downloads remote changes and immediately integrates them into your current branch.',
'mod10.s3.warning': 'If you have local uncommitted changes, pull may fail or create conflicts. Commit or stash your changes first.',
'mod10.s4.title': 'Fetch vs Pull',
'mod10.s4.desc': 'Fetch is safer — it downloads changes without modifying your work. You can review with "git diff main origin/main" before merging. Pull is convenient but can surprise you with merge conflicts.',
'mod10.s5.title': 'Push Your Changes',
'mod10.s5.desc': 'Upload your local commits to the remote repository. Others can then pull your changes.',
'mod10.s6.title': 'Track Remote Branches',
'mod10.s6.desc': 'View remote branches with git branch -r. Set up tracking with --set-upstream-to to link your local branch to a remote branch.',
'mod10.s7.title': 'Pull Requests',
'mod10.s7.desc': 'Pull Requests (PRs) are a GitHub feature for proposing changes. You push a branch, open a PR, request reviews, discuss, and merge when approved. They are essential for team collaboration.',
'mod10.s7.vscode': 'Install the "GitHub Pull Requests and Issues" extension in VSCode to create and review PRs directly in your editor.',

// Module 11 steps
'mod11.s1.title': 'What Causes Conflicts?',
'mod11.s1.desc': 'Merge conflicts occur when two branches modify the same lines in the same file, or when one branch deletes a file that the other branch modified. Git cannot automatically decide which change to keep.',
'mod11.s2.title': 'Create a Conflict Scenario',
'mod11.s2.desc': 'Let us create a conflict intentionally. Create two branches that modify the same line of the same file, then try to merge them.',
'mod11.s3.title': 'Identify Conflict Markers',
'mod11.s3.desc': 'When a conflict occurs, Git marks the conflicting areas in the file with special markers: <<<<<<< HEAD shows your current branch changes, ======= separates the two versions, and >>>>>>> branch-name shows the incoming changes.',
'mod11.s4.title': 'Resolve Manually',
'mod11.s4.desc': 'Edit the file to remove the conflict markers and keep the desired content. You decide what the final version should look like — you can keep one side, the other, or combine both.',
'mod11.s5.title': 'Resolve in VSCode',
'mod11.s5.desc': 'VSCode provides a visual merge editor with options to "Accept Current Change", "Accept Incoming Change", "Accept Both Changes", or "Compare Changes". This makes conflict resolution much easier.',
'mod11.s5.vscode': 'VSCode highlights conflicts with colored backgrounds and provides clickable buttons above each conflict to quickly choose a resolution.',
'mod11.s6.title': 'Complete the Merge',
'mod11.s6.desc': 'After resolving all conflicts, stage the resolved files with git add and complete the merge with git commit.',
'mod11.s7.title': 'Abort a Merge',
'mod11.s7.desc': 'If you want to cancel the merge and go back to the state before you started merging, use git merge --abort.',
'mod11.s7.tip': 'Aborting a merge is safe — it restores your working directory and index to the pre-merge state.',

// Module 12 steps
'mod12.s1.title': 'What is Rebasing?',
'mod12.s1.desc': 'Rebasing re-applies your commits on top of another branch tip. Instead of creating a merge commit, it rewrites history to create a linear sequence of commits.',
'mod12.s2.title': 'Basic Rebase',
'mod12.s2.desc': 'While on your feature branch, rebase onto main to incorporate the latest changes. This moves your feature branch commits to the tip of main.',
'mod12.s3.title': 'Rebase vs Merge',
'mod12.s3.desc': 'Merge preserves history exactly as it happened (with merge commits). Rebase creates a cleaner, linear history but rewrites commit hashes. Use merge for shared branches, rebase for local cleanup.',
'mod12.s4.title': 'Interactive Rebase',
'mod12.s4.desc': 'Interactive rebase lets you edit, reorder, squash, or drop commits. The -i flag opens an editor where you control each commit.',
'mod12.s4.vscode': 'VSCode serves as the editor for interactive rebase when configured as your Git editor. You will see a list of commits with actions.',
'mod12.s5.title': 'Squashing Commits',
'mod12.s5.desc': 'Squashing combines multiple commits into one. In interactive rebase, change "pick" to "squash" (or "s") for commits you want to combine into the previous commit.',
'mod12.s5.tip': 'Squash work-in-progress commits before merging a feature branch to keep the main branch history clean and readable.',
'mod12.s6.title': 'The Golden Rule of Rebasing',
'mod12.s6.desc': 'Never rebase commits that have been pushed to a shared/public branch. Rebasing rewrites commit history, which can cause serious problems for other developers who have based work on those commits.',
'mod12.s6.warning': 'NEVER rebase commits that exist on a remote branch others are using. This rewrites history and will cause conflicts for everyone.',
'mod12.s7.title': 'Abort a Rebase',
'mod12.s7.desc': 'If a rebase goes wrong or you encounter conflicts you do not want to resolve, abort and return to the pre-rebase state.',

// Module 13 steps
'mod13.s1.title': 'What is Stashing?',
'mod13.s1.desc': 'Stashing temporarily saves your uncommitted changes (both staged and unstaged) so you can switch branches or pull updates without losing work. Think of it as a clipboard for your changes.',
'mod13.s2.title': 'Save Changes to Stash',
'mod13.s2.desc': 'Stash your current changes. Use -m to add a descriptive message for easy identification later.',
'mod13.s3.title': 'List Stashes',
'mod13.s3.desc': 'View all saved stashes. Each stash has an index (stash@{0} is the most recent) and shows the branch and message.',
'mod13.s4.title': 'Apply Stash',
'mod13.s4.desc': 'Restore stashed changes. "git stash pop" applies and removes the stash. "git stash apply" applies but keeps the stash for later use.',
'mod13.s4.tip': 'Use "pop" when you are done with the stash. Use "apply" if you might need to apply the same stash to multiple branches.',
'mod13.s5.title': 'Drop a Stash',
'mod13.s5.desc': 'Remove a specific stash from the stash list without applying it.',
'mod13.s6.title': 'What is Cherry-Pick?',
'mod13.s6.desc': 'Cherry-pick lets you apply a specific commit from one branch onto another. Unlike merge (which brings all commits), cherry-pick selects individual commits.',
'mod13.s7.title': 'Cherry-Pick a Commit',
'mod13.s7.desc': 'Apply a specific commit to your current branch by providing its hash. The commit is re-applied as a new commit with a new hash.',
'mod13.s7.tip': 'Cherry-pick is useful for applying hotfixes from a release branch to main, or for selectively bringing features across branches.',

// Module 14 steps
'mod14.s1.title': 'Discard Working Changes',
'mod14.s1.desc': 'Discard changes in your working directory that have not been staged. This restores the file to the last committed version.',
'mod14.s1.warning': 'This permanently discards your changes. There is no undo for unstaged work that has not been committed.',
'mod14.s2.title': 'Unstage Changes',
'mod14.s2.desc': 'Remove a file from the staging area without discarding the changes. The file goes back to "modified" status in the working directory.',
'mod14.s3.title': 'Soft Reset',
'mod14.s3.desc': 'Move the branch pointer back one commit but keep all changes staged. Useful for re-doing a commit message or combining with more changes.',
'mod14.s3.tip': 'Soft reset is the safest reset — it only moves HEAD. All your changes remain staged and ready to commit.',
'mod14.s4.title': 'Mixed Reset (Default)',
'mod14.s4.desc': 'Move the branch pointer back and unstage changes, but keep them in the working directory. This is the default behavior of git reset.',
'mod14.s5.title': 'Hard Reset',
'mod14.s5.desc': 'Move the branch pointer back AND discard all changes in the staging area and working directory. This is destructive and cannot be easily undone.',
'mod14.s5.warning': 'Hard reset permanently destroys all uncommitted changes and removes commits. Use this only when you are absolutely sure.',
'mod14.s6.title': 'Revert a Commit',
'mod14.s6.desc': 'Create a new commit that undoes the changes of a previous commit. Unlike reset, revert is safe for shared branches because it does not rewrite history.',
'mod14.s6.tip': 'Use revert instead of reset on shared branches. Revert adds a new commit rather than removing old ones.',
'mod14.s7.title': 'Reset vs Revert',
'mod14.s7.desc': 'Reset rewrites history (moves the branch pointer backward) — dangerous for shared branches. Revert creates a new commit that undoes changes — safe for shared branches. Use reset for local cleanup, revert for public history.',
'mod14.s8.title': 'Reflog — Recovering Lost Commits',
'mod14.s8.desc': 'The reflog records every change to HEAD, even those "lost" by reset. If you accidentally reset too far, use reflog to find the commit hash and recover.',
'mod14.s8.tip': 'Reflog is your safety net. Even after a hard reset, you can recover commits within about 90 days using the reflog.',

// Module 15 steps
'mod15.s1.title': 'Create .gitignore',
'mod15.s1.desc': 'A .gitignore file tells Git which files and directories to ignore. Common entries include: node_modules/, .env, *.log, .DS_Store, dist/, and IDE-specific folders.',
'mod15.s1.tip': 'Visit gitignore.io (or github.com/github/gitignore) for ready-made templates for your programming language or framework.',
'mod15.s2.title': 'Global .gitignore',
'mod15.s2.desc': 'Set up a global .gitignore for files you always want to ignore across all repositories (like OS-specific files .DS_Store, Thumbs.db).',
'mod15.s3.title': 'Lightweight Tags',
'mod15.s3.desc': 'Lightweight tags are simple pointers to a commit. They are like bookmarks — just a name pointing to a specific commit.',
'mod15.s4.title': 'Annotated Tags',
'mod15.s4.desc': 'Annotated tags store extra metadata: tagger name, email, date, and a message. They are recommended for releases.',
'mod15.s4.tip': 'Use annotated tags for releases (v1.0, v2.0) and lightweight tags for temporary or internal markers.',
'mod15.s5.title': 'Push Tags to Remote',
'mod15.s5.desc': 'Tags are not pushed by default with git push. Use --tags to push all tags, or push a specific tag by name.',
'mod15.s6.title': 'GitHub Releases',
'mod15.s6.desc': 'GitHub Releases build on top of tags. Go to your repository > Releases > "Create a new release", select a tag, add release notes and optionally attach binary files.',
'mod15.s6.vscode': 'The GitHub Pull Requests extension allows you to browse releases, but creating them is best done through the GitHub web interface.',

// Module 16 steps
'mod16.s1.title': 'GitFlow Workflow',
'mod16.s1.desc': 'GitFlow uses two permanent branches: main (production-ready code) and develop (integration branch). Feature branches branch from develop, release branches prepare for production, and hotfix branches fix urgent production bugs.',
'mod16.s2.title': 'GitHub Flow',
'mod16.s2.desc': 'GitHub Flow is simpler: only the main branch is permanent. Create feature branches from main, open pull requests, get reviews, and merge back. Deploy happens from main after merge.',
'mod16.s3.title': 'Trunk-Based Development',
'mod16.s3.desc': 'All developers commit to a single "trunk" branch (main). Feature branches are extremely short-lived (hours, not days). Feature flags control incomplete work in production. Emphasis on CI/CD.',
'mod16.s4.title': 'Commit Message Conventions',
'mod16.s4.desc': 'Conventional Commits format: type(scope): description. Types include: feat (new feature), fix (bug fix), docs (documentation), style (formatting), refactor, test, chore (maintenance). Example: "feat(auth): add OAuth2 login"',
'mod16.s4.tip': 'Good commit messages explain WHY, not just WHAT. The code diff shows what changed; the message should explain the reasoning.',
'mod16.s5.title': 'Branch Protection Rules',
'mod16.s5.desc': 'On GitHub, protect important branches: require pull request reviews, require status checks (CI) to pass, require branches to be up to date, restrict who can push directly.',
'mod16.s5.vscode': 'When branch protection is enabled, you will see errors if you try to push directly to a protected branch from VSCode.',
'mod16.s6.title': 'Code Review Best Practices',
'mod16.s6.desc': 'Effective code reviews: keep PRs small and focused, write clear PR descriptions, review for logic and design (not just style), be constructive in feedback, use automated linting and tests, approve or request changes promptly.',

// Module 17 — HEAD & Relative Refs
'mod17.title': 'HEAD & Relative Refs',
'mod17.desc': 'Understand what HEAD is, navigate commit history using relative references (^ and ~), and learn to move branch pointers.',
'mod17.s1.title': 'Understanding HEAD',
'mod17.s1.desc': 'HEAD is a pointer to the current commit you are working on. Usually it points to a branch name (like main), which in turn points to a commit. Think of HEAD as "where am I right now?" in the Git history.',
'mod17.s2.title': 'Detached HEAD State',
'mod17.s2.desc': 'When you checkout a specific commit hash instead of a branch, HEAD points directly to that commit — this is called "detached HEAD." You can look around and make experimental changes, but any commits you make won\'t belong to any branch unless you create one.',
'mod17.s2.tip': 'If you accidentally end up in detached HEAD, run "git switch -" or "git switch main" to get back.',
'mod17.s3.title': 'Relative Refs with Caret (^)',
'mod17.s3.desc': 'The caret (^) moves up one parent in the commit tree. HEAD^ means "the parent of HEAD." At merge commits, ^1 is the first parent (the branch you merged into) and ^2 is the second parent (the branch that was merged).',
'mod17.s4.title': 'Relative Refs with Tilde (~)',
'mod17.s4.desc': 'The tilde (~) followed by a number moves up that many generations. HEAD~3 means "go back 3 commits from HEAD." It always follows the first parent, making it ideal for linear navigation.',
'mod17.s5.title': 'Branch Forcing',
'mod17.s5.desc': 'Use "git branch -f <branch> <target>" to move a branch pointer to any commit. For example, "git branch -f main HEAD~3" moves main back 3 commits. This is powerful but dangerous — never do this on shared branches.',
'mod17.s5.warning': 'Moving branch pointers with -f can cause data loss if you are not careful. Always make sure you know where the branch will end up.',
'mod17.s6.title': 'Practical Navigation',
'mod17.s6.desc': 'Use "git log --oneline --graph --all" to visualize your history, then use relative refs to navigate. Combine with "git show HEAD~2" to inspect specific commits without leaving your current branch.',

// Module 18 — Interactive Rebase Mastery
'mod18.title': 'Interactive Rebase Mastery',
'mod18.desc': 'Master interactive rebase to reorder, squash, edit, and drop commits for a clean, professional commit history.',
'mod18.s1.title': 'What is Interactive Rebase',
'mod18.s1.desc': 'Interactive rebase (git rebase -i) opens an editor showing recent commits with actions: pick (keep), reword (change message), squash (combine with previous), edit (pause to amend), and drop (remove). It lets you rewrite history before sharing.',
'mod18.s2.title': 'Reordering Commits',
'mod18.s2.desc': 'In the interactive rebase editor, you can rearrange the order of lines to reorder commits. This is useful for grouping related changes together or putting important fixes first for easier code review.',
'mod18.s3.title': 'Squashing Commits',
'mod18.s3.desc': 'Change "pick" to "squash" (or "s") to combine a commit with the one above it. This is perfect for cleaning up "WIP" or "fix typo" commits into a single meaningful commit before merging a feature branch.',
'mod18.s4.title': 'Editing Past Commits',
'mod18.s4.desc': 'Use "edit" to pause the rebase at a specific commit. Git stops and lets you amend that commit with "git commit --amend", add files, or make any changes. Then continue with "git rebase --continue".',
'mod18.s5.title': 'Splitting a Commit',
'mod18.s5.desc': 'To split a commit, mark it as "edit" in interactive rebase. When Git pauses, run "git reset HEAD^" to unstage the changes, then create multiple smaller commits. Finally run "git rebase --continue".',
'mod18.s6.title': 'The Golden Rule of Rebasing',
'mod18.s6.desc': 'Never rebase commits that have been pushed to a shared/public branch. Rebasing rewrites commit hashes, which causes problems for anyone who has based work on those commits. Only rebase local, unpublished commits.',
'mod18.s6.warning': 'Rebasing public commits forces everyone else to re-sync their work. This is the most common source of Git disasters in teams.',
'mod18.s7.title': 'Rebase vs Merge',
'mod18.s7.desc': 'Merge preserves the exact history (including merge commits) while rebase creates a linear history. Use rebase for feature branches before merging to keep history clean. Use merge for integrating long-lived branches where the merge point matters.',

// Module 19 — Git Hooks & Automation
'mod19.title': 'Git Hooks & Automation',
'mod19.desc': 'Automate your workflow with Git hooks. Run linters, tests, and formatters automatically on commit, push, and other Git events.',
'mod19.s1.title': 'What are Git Hooks',
'mod19.s1.desc': 'Git hooks are scripts that run automatically when certain Git events occur. They live in .git/hooks/ and can be client-side (pre-commit, commit-msg, pre-push) or server-side (pre-receive, post-receive). They help enforce code quality standards.',
'mod19.s2.title': 'Pre-commit Hook',
'mod19.s2.desc': 'The pre-commit hook runs before each commit is created. Use it to run linters, code formatters, or checks. If the script exits with a non-zero status, the commit is aborted. This prevents bad code from entering the repository.',
'mod19.s3.title': 'Commit-msg Hook',
'mod19.s3.desc': 'The commit-msg hook runs after you write your commit message. It receives the message file path as an argument. Use it to enforce commit message conventions like Conventional Commits (feat:, fix:, docs:, etc.).',
'mod19.s4.title': 'Pre-push Hook',
'mod19.s4.desc': 'The pre-push hook runs before git push sends data to the remote. Use it to run your test suite — if tests fail, the push is cancelled. This is your last line of defense before code reaches the shared repository.',
'mod19.s5.title': 'Setting Up Husky',
'mod19.s5.desc': 'Husky is an npm package that makes Git hooks easy to manage and share across a team. Run "npx husky init" to set it up. Hooks are stored in a .husky/ directory that gets committed to the repo, so every team member gets the same hooks.',
'mod19.s6.title': 'lint-staged',
'mod19.s6.desc': 'lint-staged runs linters only on files that are staged for commit (not the entire codebase). Combined with Husky, it makes pre-commit hooks fast. Configure it in package.json with patterns like "*.js": ["eslint --fix", "prettier --write"].',

// Module 20 — Advanced Remote Operations
'mod20.title': 'Advanced Remote Operations',
'mod20.desc': 'Master advanced remote workflows: refspecs, upstream tracking, force pushing safely, handling diverged histories, and managing multiple remotes.',
'mod20.s1.title': 'Remote Tracking Branches',
'mod20.s1.desc': 'Remote tracking branches (like origin/main) are local references to the state of branches on the remote. They update when you fetch or pull. They show you where the remote branch was the last time you communicated with the server.',
'mod20.s2.title': 'Setting Upstream Tracking',
'mod20.s2.desc': 'Upstream tracking links your local branch to a remote branch. Set it with "git push -u origin feature" or "git branch -u origin/feature". Once set, "git push" and "git pull" work without specifying the remote and branch.',
'mod20.s3.title': 'Push with Refspecs',
'mod20.s3.desc': 'The colon syntax "git push origin main:production" pushes your local main to the remote production branch. This decouples the local and remote branch names. You can push any local ref to any remote destination.',
'mod20.s4.title': 'Fetch with Refspecs',
'mod20.s4.desc': 'Similarly, "git fetch origin main" fetches only the main branch. The colon syntax "git fetch origin main:refs/remotes/origin/main" explicitly specifies where to store the fetched data locally.',
'mod20.s5.title': 'Handling Diverged History',
'mod20.s5.desc': 'When your local and remote branches have both received new commits, they "diverge." Use "git pull --rebase" to replay your local commits on top of the remote changes, creating a clean linear history instead of a merge commit.',
'mod20.s6.title': 'Force Push Safely',
'mod20.s6.desc': 'After amending or rebasing local commits, a regular push will fail. Use "git push --force-with-lease" instead of --force. It only succeeds if the remote hasn\'t been updated by someone else, preventing you from overwriting teammates\' work.',
'mod20.s6.warning': 'Never use "git push --force" on shared branches. Always prefer --force-with-lease for safety.',
'mod20.s7.title': 'Multiple Remotes & Forks',
'mod20.s7.desc': 'When contributing to open-source, you typically have two remotes: "origin" (your fork) and "upstream" (the original repo). Add upstream with "git remote add upstream <url>", then "git fetch upstream" to stay in sync with the original project.',

// Module 21 — Git Bisect & Debugging
'mod21.title': 'Git Bisect & Debugging',
'mod21.desc': 'Use Git bisect to efficiently find the commit that introduced a bug, and git blame to track who changed what and when.',
'mod21.s1.title': 'What is Git Bisect',
'mod21.s1.desc': 'Git bisect performs a binary search through your commit history to find the exact commit that introduced a bug. Instead of checking every commit, it halves the search space each time, finding the culprit in O(log n) steps.',
'mod21.s2.title': 'Starting Bisect',
'mod21.s2.desc': 'Start with "git bisect start", then mark the current commit as bad with "git bisect bad" and a known good commit with "git bisect good <hash>". Git will checkout a commit in the middle for you to test.',
'mod21.s3.title': 'Bisect Walkthrough',
'mod21.s3.desc': 'At each step, test whether the bug exists. Run "git bisect good" if the bug is not present, or "git bisect bad" if it is. Git narrows down the range each time. For 1000 commits, you\'ll find the bug in about 10 steps.',
'mod21.s4.title': 'Ending Bisect',
'mod21.s4.desc': 'When Git has identified the first bad commit, it shows you the culprit with its hash, author, date, and message. Run "git bisect reset" to return to your original HEAD and end the bisect session.',
'mod21.s5.title': 'Automated Bisect',
'mod21.s5.desc': 'For automated testing, use "git bisect run <test-script>". Git will automatically run your script at each step — if it returns 0 (pass) Git marks it good, non-zero means bad. This can find bugs in seconds without any manual intervention.',
'mod21.s6.title': 'Git Blame',
'mod21.s6.desc': 'Use "git blame <file>" to see who last modified each line, along with the commit hash and date. This helps trace when and why a specific change was made. In VSCode, the GitLens extension provides inline blame annotations.',
'mod21.s6.vscode': 'Install the GitLens extension for inline blame annotations, commit details on hover, and rich history visualization.',

// New Quiz Questions
'quiz.b9.q': 'What is the difference between "git switch" and "git checkout"?',
'quiz.b9.o1': 'They are exactly the same command',
'quiz.b9.o2': '"git switch" is for switching branches; "git checkout" can also restore files',
'quiz.b9.o3': '"git switch" is deprecated in favor of "git checkout"',
'quiz.b9.o4': '"git switch" only works with remote branches',
'quiz.b9.explain': '"git switch" was introduced in Git 2.23 specifically for branch switching. "git checkout" is overloaded — it can switch branches AND restore files, which was confusing. Use "git switch" for branches and "git restore" for files.',
'quiz.b10.q': 'What does "git log --oneline" show?',
'quiz.b10.o1': 'A condensed log with one commit per line showing hash and message',
'quiz.b10.o2': 'Only the most recent commit',
'quiz.b10.o3': 'The full diff of each commit on one line',
'quiz.b10.o4': 'Only commits from the current branch that are not merged',
'quiz.b10.explain': '"git log --oneline" shows each commit as a single line with the abbreviated hash and the first line of the commit message. It is useful for getting a quick overview of recent history.',
'quiz.b11.q': 'What happens if you try to switch branches with uncommitted changes?',
'quiz.b11.o1': 'Git automatically commits your changes',
'quiz.b11.o2': 'Git silently discards the changes',
'quiz.b11.o3': 'Git may prevent the switch and ask you to commit or stash changes',
'quiz.b11.o4': 'Git creates a temporary branch for the changes',
'quiz.b11.explain': 'If your uncommitted changes conflict with the target branch, Git will abort the switch and tell you to commit or stash first. If there are no conflicts, Git may carry the changes over to the new branch.',
'quiz.b12.q': 'What is the purpose of a .gitignore file?',
'quiz.b12.o1': 'To specify files and patterns that Git should not track',
'quiz.b12.o2': 'To list files that should be deleted from the repository',
'quiz.b12.o3': 'To hide files from other collaborators',
'quiz.b12.o4': 'To compress files to save space in the repository',
'quiz.b12.explain': '.gitignore tells Git which files or patterns to ignore. Common entries include node_modules/, .env, *.log, and build output directories. Files already tracked by Git are not affected — you must untrack them first.',
'quiz.i9.q': 'What is a detached HEAD state?',
'quiz.i9.o1': 'When HEAD points directly to a commit instead of a branch reference',
'quiz.i9.o2': 'When the HEAD file is corrupted',
'quiz.i9.o3': 'When you have no commits in your repository',
'quiz.i9.o4': 'When HEAD points to a remote branch',
'quiz.i9.explain': 'Detached HEAD occurs when you checkout a specific commit hash, tag, or remote branch. HEAD points directly to a commit instead of a branch. Any new commits you make will not be on any branch and may be lost when you switch away.',
'quiz.i10.q': 'What does "git checkout HEAD~3" do?',
'quiz.i10.o1': 'Deletes the last 3 commits permanently',
'quiz.i10.o2': 'Creates a new branch 3 commits behind HEAD',
'quiz.i10.o3': 'Moves HEAD back 3 commits from the current position (detached HEAD)',
'quiz.i10.o4': 'Reverts the last 3 commits with new undo commits',
'quiz.i10.explain': '"git checkout HEAD~3" moves HEAD to the commit that is 3 generations back from the current commit. This puts you in detached HEAD state, allowing you to inspect old code without modifying any branches.',
'quiz.i11.q': 'What does "git branch -f main HEAD~2" do?',
'quiz.i11.o1': 'Forces the main branch pointer to move 2 commits behind HEAD',
'quiz.i11.o2': 'Creates a new branch called main',
'quiz.i11.o3': 'Deletes the main branch',
'quiz.i11.o4': 'Merges HEAD~2 into main',
'quiz.i11.explain': '"git branch -f" forcefully moves a branch pointer to any commit. "git branch -f main HEAD~2" reassigns where main points to, without needing to be on that branch. Use with caution on shared branches.',
'quiz.i12.q': 'What is the difference between ^ and ~ in Git?',
'quiz.i12.o1': '^ selects a parent at merge commits; ~ moves back a number of generations',
'quiz.i12.o2': 'They are exactly the same',
'quiz.i12.o3': '^ is for branches; ~ is for tags',
'quiz.i12.o4': '^ moves forward; ~ moves backward',
'quiz.i12.explain': 'The tilde (~) moves back N generations following the first parent: HEAD~3 = 3 commits back. The caret (^) selects which parent at merge commits: HEAD^2 = the second parent of a merge. They can be chained: HEAD~2^2.',
'quiz.a9.q': 'What does "git push --force-with-lease" do?',
'quiz.a9.o1': 'Force pushes only if the remote branch hasn\'t been updated by someone else',
'quiz.a9.o2': 'Pushes and automatically merges remote changes',
'quiz.a9.o3': 'Same as "git push --force" but creates a backup',
'quiz.a9.o4': 'Pushes only committed files, ignoring staged changes',
'quiz.a9.explain': '--force-with-lease is a safer alternative to --force. It checks that the remote branch still matches what you last fetched. If someone else has pushed new commits, your force push is rejected, preventing accidental data loss.',
'quiz.a10.q': 'What is "git bisect" used for?',
'quiz.a10.o1': 'Binary search through commits to find which one introduced a bug',
'quiz.a10.o2': 'Splitting a branch into two separate branches',
'quiz.a10.o3': 'Comparing differences between two branches',
'quiz.a10.o4': 'Merging two branches at their midpoint',
'quiz.a10.explain': 'Git bisect performs a binary search through your commit history. You mark a known bad commit and a known good commit, then Git checks out the midpoint for you to test. This efficiently finds the exact commit that introduced a regression.',
'quiz.a11.q': 'What does "git push origin main:production" do?',
'quiz.a11.o1': 'Pushes the local main branch to the remote production branch',
'quiz.a11.o2': 'Merges production into main locally',
'quiz.a11.o3': 'Renames the main branch to production',
'quiz.a11.o4': 'Creates both main and production branches on the remote',
'quiz.a11.explain': 'The colon syntax in push specifies <local-source>:<remote-destination>. "git push origin main:production" takes the commits from your local main branch and pushes them to the production branch on the remote named origin.',
'quiz.a12.q': 'What is the purpose of "git rebase -i HEAD~4"?',
'quiz.a12.o1': 'Opens an interactive editor to reorder, squash, edit, or drop the last 4 commits',
'quiz.a12.o2': 'Deletes the last 4 commits',
'quiz.a12.o3': 'Creates 4 new branches from HEAD',
'quiz.a12.o4': 'Reverts the last 4 commits with undo commits',
'quiz.a12.explain': 'Interactive rebase (-i) opens your editor showing the last 4 commits with action prefixes. You can pick (keep), reword, squash (combine), edit (amend), fixup, or drop each commit. This is the most powerful tool for cleaning up commit history.',
'quiz.a13.q': 'What does the pre-commit hook do?',
'quiz.a13.o1': 'Runs a script before each commit, often used for linting or formatting',
'quiz.a13.o2': 'Prevents anyone from committing to the main branch',
'quiz.a13.o3': 'Automatically writes commit messages',
'quiz.a13.o4': 'Sends a notification to team members before each commit',
'quiz.a13.explain': 'The pre-commit hook is a script that runs before a commit is created. If it exits with a non-zero status, the commit is aborted. Teams commonly use it to run linters, formatters, and type-checkers to maintain code quality.',
'quiz.a14.q': 'What is "git blame" used for?',
'quiz.a14.o1': 'Shows who last modified each line of a file and in which commit',
'quiz.a14.o2': 'Lists all contributors to a repository',
'quiz.a14.o3': 'Finds and reports code style violations',
'quiz.a14.o4': 'Identifies merge conflicts in a file',
'quiz.a14.explain': '"git blame <file>" annotates each line with the commit hash, author, and date of the last modification. It helps you understand when and why a line was changed and who to ask about it.',

// New challenge translations
'terminal.ch.detachedHead': 'Detached HEAD Navigation',
'terminal.ch.detachedHead.desc': 'Navigate commit history using relative refs and learn to work in detached HEAD state.',
'terminal.ch.detachedHead.s1': 'Initialize a new repository',
'terminal.ch.detachedHead.s1.hint': 'git init',
'terminal.ch.detachedHead.s2': 'Create a file',
'terminal.ch.detachedHead.s2.hint': 'touch file1.txt',
'terminal.ch.detachedHead.s3': 'Stage the file',
'terminal.ch.detachedHead.s3.hint': 'git add file1.txt',
'terminal.ch.detachedHead.s4': 'Make first commit',
'terminal.ch.detachedHead.s4.hint': 'git commit -m "first commit"',
'terminal.ch.detachedHead.s5': 'Create another file and commit',
'terminal.ch.detachedHead.s5.hint': 'touch file2.txt',
'terminal.ch.detachedHead.s6': 'Stage and commit',
'terminal.ch.detachedHead.s6.hint': 'git add . && git commit -m "second commit"',
'terminal.ch.detachedHead.s7': 'View commit log',
'terminal.ch.detachedHead.s7.hint': 'git log --oneline',
'terminal.ch.detachedHead.s8': 'Go back one commit (detached HEAD)',
'terminal.ch.detachedHead.s8.hint': 'git checkout HEAD~1',
'terminal.ch.detachedHead.s9': 'Return to main branch',
'terminal.ch.detachedHead.s9.hint': 'git checkout main',
'terminal.ch.pullRebase': 'Pull with Rebase',
'terminal.ch.pullRebase.desc': 'Handle diverged history by pulling with rebase for a clean linear history.',
'terminal.ch.pullRebase.s1': 'Initialize repository',
'terminal.ch.pullRebase.s1.hint': 'git init',
'terminal.ch.pullRebase.s2': 'Add a remote',
'terminal.ch.pullRebase.s2.hint': 'git remote add origin https://github.com/user/repo.git',
'terminal.ch.pullRebase.s3': 'Create a file',
'terminal.ch.pullRebase.s3.hint': 'touch app.js',
'terminal.ch.pullRebase.s4': 'Stage and commit',
'terminal.ch.pullRebase.s4.hint': 'git add . && git commit -m "initial"',
'terminal.ch.pullRebase.s5': 'Push to remote',
'terminal.ch.pullRebase.s5.hint': 'git push -u origin main',
'terminal.ch.pullRebase.s6': 'Make a local change and commit',
'terminal.ch.pullRebase.s6.hint': 'touch local.js && git add . && git commit -m "local work"',
'terminal.ch.pullRebase.s7': 'Pull with rebase',
'terminal.ch.pullRebase.s7.hint': 'git pull --rebase origin main',
'terminal.ch.interactiveRebase': 'Interactive Rebase',
'terminal.ch.interactiveRebase.desc': 'Use interactive rebase to squash and clean up your commit history.',
'terminal.ch.interactiveRebase.s1': 'Initialize repository',
'terminal.ch.interactiveRebase.s1.hint': 'git init',
'terminal.ch.interactiveRebase.s2': 'Create file1 and commit',
'terminal.ch.interactiveRebase.s2.hint': 'touch file1.txt',
'terminal.ch.interactiveRebase.s3': 'Stage and commit file1',
'terminal.ch.interactiveRebase.s3.hint': 'git add . && git commit -m "add file1"',
'terminal.ch.interactiveRebase.s4': 'Create file2 and commit',
'terminal.ch.interactiveRebase.s4.hint': 'touch file2.txt',
'terminal.ch.interactiveRebase.s5': 'Stage and commit file2',
'terminal.ch.interactiveRebase.s5.hint': 'git add . && git commit -m "add file2"',
'terminal.ch.interactiveRebase.s6': 'Create file3 and commit',
'terminal.ch.interactiveRebase.s6.hint': 'touch file3.txt',
'terminal.ch.interactiveRebase.s7': 'Stage and commit file3',
'terminal.ch.interactiveRebase.s7.hint': 'git add . && git commit -m "add file3"',
'terminal.ch.interactiveRebase.s8': 'View history',
'terminal.ch.interactiveRebase.s8.hint': 'git log --oneline',
'terminal.ch.interactiveRebase.s9': 'Start interactive rebase',
'terminal.ch.interactiveRebase.s9.hint': 'git rebase -i HEAD~3',
'terminal.ch.bisect': 'Bug Hunt with Bisect',
'terminal.ch.bisect.desc': 'Use git bisect to perform a binary search and find the commit that introduced a bug.',
'terminal.ch.bisect.s1': 'Initialize repository',
'terminal.ch.bisect.s1.hint': 'git init',
'terminal.ch.bisect.s2': 'Create app and commit (working version)',
'terminal.ch.bisect.s2.hint': 'touch app.js',
'terminal.ch.bisect.s3': 'Stage and commit v1',
'terminal.ch.bisect.s3.hint': 'git add . && git commit -m "v1 working"',
'terminal.ch.bisect.s4': 'Make changes and commit (broken version)',
'terminal.ch.bisect.s4.hint': 'echo "bug" >> app.js',
'terminal.ch.bisect.s5': 'Stage and commit v2',
'terminal.ch.bisect.s5.hint': 'git add . && git commit -m "v2 broken"',
'terminal.ch.bisect.s6': 'Start bisect',
'terminal.ch.bisect.s6.hint': 'git bisect start',
'terminal.ch.bisect.s7': 'Mark current commit as bad',
'terminal.ch.bisect.s7.hint': 'git bisect bad',
'terminal.ch.bisect.s8': 'Mark first commit as good',
'terminal.ch.bisect.s8.hint': 'git bisect good HEAD~1',
'terminal.ch.bisect.s9': 'End bisect session',
'terminal.ch.bisect.s9.hint': 'git bisect reset',
'terminal.ch.forcePush': 'Safe Force Push',
'terminal.ch.forcePush.desc': 'Learn to use --force-with-lease for safe force pushing after amending commits.',
'terminal.ch.forcePush.s1': 'Initialize repository',
'terminal.ch.forcePush.s1.hint': 'git init',
'terminal.ch.forcePush.s2': 'Add remote',
'terminal.ch.forcePush.s2.hint': 'git remote add origin https://github.com/user/repo.git',
'terminal.ch.forcePush.s3': 'Create file and commit',
'terminal.ch.forcePush.s3.hint': 'touch app.js',
'terminal.ch.forcePush.s4': 'Stage and commit',
'terminal.ch.forcePush.s4.hint': 'git add . && git commit -m "initial"',
'terminal.ch.forcePush.s5': 'Push to remote',
'terminal.ch.forcePush.s5.hint': 'git push -u origin main',
'terminal.ch.forcePush.s6': 'Amend the last commit',
'terminal.ch.forcePush.s6.hint': 'git commit --amend -m "improved initial"',
'terminal.ch.forcePush.s7': 'Safe force push',
'terminal.ch.forcePush.s7.hint': 'git push --force-with-lease',

// Cheat sheet categories
'cheat.cat.setup': 'Setup & Config',
'cheat.cat.creating': 'Creating Repos',
'cheat.cat.basic': 'Basic Snapshotting',
'cheat.cat.branching': 'Branching & Switching',
'cheat.cat.merging': 'Merging',
'cheat.cat.remote': 'Remote Repositories',
'cheat.cat.inspection': 'Inspection & History',
'cheat.cat.undoing': 'Undoing Changes',

// Cheat sheet commands
'cheat.config.name': 'Set the name attached to your commits',
'cheat.config.email': 'Set the email attached to your commits',
'cheat.config.editor': 'Set default text editor',
'cheat.config.defaultbranch': 'Set default branch name',
'cheat.config.color': 'Enable colored output',
'cheat.config.list': 'List all settings',
'cheat.config.alias': 'Create a command shortcut',
'cheat.init': 'Create a new local repository',
'cheat.clone': 'Clone a remote repository',
'cheat.clone.branch': 'Clone a specific branch',
'cheat.clone.shallow': 'Clone with limited history',
'cheat.status': 'Show working tree status',
'cheat.add.file': 'Stage a specific file',
'cheat.add.all': 'Stage all changes',
'cheat.add.patch': 'Stage changes interactively',
'cheat.commit': 'Commit staged changes with message',
'cheat.commit.amend': 'Modify the most recent commit',
'cheat.diff': 'Show unstaged changes',
'cheat.diff.staged': 'Show staged changes',
'cheat.branch.list': 'List local branches',
'cheat.branch.create': 'Create a new branch',
'cheat.switch': 'Switch to a branch',
'cheat.switch.create': 'Create and switch to branch',
'cheat.branch.delete': 'Delete a merged branch',
'cheat.branch.deleteforce': 'Force delete a branch',
'cheat.branch.remote': 'List remote branches',
'cheat.merge': 'Merge branch into current',
'cheat.merge.noff': 'Merge with a merge commit',
'cheat.merge.abort': 'Abort a merge in progress',
'cheat.merge.squash': 'Squash merge a branch',
'cheat.rebase': 'Rebase current branch onto another',
'cheat.rebase.interactive': 'Interactive rebase last N commits',
'cheat.remote.add': 'Add a new remote',
'cheat.remote.list': 'List remotes with URLs',
'cheat.push': 'Push branch to remote',
'cheat.push.upstream': 'Push and set upstream tracking',
'cheat.pull': 'Pull changes from remote',
'cheat.fetch': 'Fetch changes without merging',
'cheat.push.tags': 'Push all tags to remote',
'cheat.log': 'Show commit log',
'cheat.log.oneline': 'Compact log with graph',
'cheat.show': 'Show commit details',
'cheat.blame': 'Show who changed each line',
'cheat.diff.branches': 'Compare two branches',
'cheat.shortlog': 'Summarize commits by author',
'cheat.restore': 'Discard working directory changes',
'cheat.restore.staged': 'Unstage a file',
'cheat.reset.soft': 'Undo commit, keep changes staged',
'cheat.reset.mixed': 'Undo commit, keep changes unstaged',
'cheat.reset.hard': 'Undo commit and discard all changes',
'cheat.revert': 'Revert a commit with new commit',
'cheat.stash': 'Stash working changes',
'cheat.stash.pop': 'Apply and remove latest stash',
'cheat.reflog': 'Show history of HEAD changes',
'cheat.cherrypick': 'Apply a specific commit to current branch',
'cheat.merge.squash': 'Squash merge a branch',

// Cheat sheet — Navigation & Refs
'cheat.cat.navigation': 'Navigation & Refs',
'cheat.nav.detach': 'Switch to a specific commit (detached HEAD)',
'cheat.nav.parent': 'Move to the parent commit',
'cheat.nav.headBack': 'Move back 3 commits',
'cheat.nav.forceMove': 'Force-move main branch 2 commits back',
'cheat.nav.describe': 'Describe current position relative to tags',
'cheat.nav.graph': 'Visual commit graph in terminal',

// Cheat sheet — Git Hooks
'cheat.cat.hooks': 'Git Hooks',
'cheat.hooks.list': 'List available hook templates',
'cheat.hooks.chmod': 'Make hook executable',
'cheat.hooks.huskyInit': 'Initialize Husky for modern hook management',
'cheat.hooks.huskyAdd': 'Add pre-commit hook',
'cheat.hooks.skip': 'Skip hooks for this commit',

// Cheat sheet — Debugging
'cheat.cat.debugging': 'Debugging',
'cheat.debug.start': 'Start binary search for bugs',
'cheat.debug.bad': 'Mark current commit as bad',
'cheat.debug.good': 'Mark a known good commit',
'cheat.debug.reset': 'End bisect and return to original HEAD',
'cheat.debug.run': 'Automate bisect with a test script',
'cheat.debug.blame': 'Show who last modified each line',

// Cheat sheet — Advanced Operations
'cheat.cat.advanced': 'Advanced Operations',
'cheat.adv.rebaseInteractive': 'Interactive rebase last 4 commits',
'cheat.adv.amend': 'Modify the last commit',
'cheat.adv.forceLease': 'Safe force push',
'cheat.adv.pushDiffBranch': 'Push to different remote branch',
'cheat.adv.addUpstream': 'Add upstream remote for forks',
'cheat.adv.fetchUpstream': 'Fetch from upstream remote',
'cheat.adv.worktree': 'Create a linked worktree',

// Quiz questions — Beginner
'quiz.b1.q': 'What does the command "git init" do?',
'quiz.b1.o1': 'Installs Git on your computer',
'quiz.b1.o2': 'Creates a new Git repository in the current directory',
'quiz.b1.o3': 'Initializes a remote connection to GitHub',
'quiz.b1.o4': 'Clones an existing repository',
'quiz.b1.explain': '"git init" creates a new .git subdirectory in the current folder, turning it into a Git repository.',
'quiz.b2.q': 'What is the staging area in Git?',
'quiz.b2.o1': 'A remote server where code is stored',
'quiz.b2.o2': 'A place where bugs are tracked',
'quiz.b2.o3': 'An intermediate area where changes are prepared before committing',
'quiz.b2.o4': 'A backup copy of your repository',
'quiz.b2.explain': 'The staging area (index) is where you assemble changes that will go into the next commit.',
'quiz.b3.q': 'What does "git add" do?',
'quiz.b3.o1': 'Creates a new file',
'quiz.b3.o2': 'Commits changes to the repository',
'quiz.b3.o3': 'Moves changes from working directory to staging area',
'quiz.b3.o4': 'Pushes changes to a remote',
'quiz.b3.explain': '"git add" stages changes, moving them from the working directory to the staging area for the next commit.',
'quiz.b4.q': 'What is the difference between "git add ." and "git add <file>"?',
'quiz.b4.o1': 'There is no difference',
'quiz.b4.o2': '"git add ." stages all changes; "git add <file>" stages a specific file',
'quiz.b4.o3': '"git add ." only works on Linux',
'quiz.b4.o4': '"git add <file>" stages all files',
'quiz.b4.explain': '"git add ." stages all modified and new files in the current directory and subdirectories, while "git add <file>" stages only the specified file.',
'quiz.b5.q': 'What is a commit in Git?',
'quiz.b5.o1': 'A promise to contribute to a project',
'quiz.b5.o2': 'A snapshot of the staged changes at a point in time',
'quiz.b5.o3': 'A branch in the repository',
'quiz.b5.o4': 'A connection to a remote repository',
'quiz.b5.explain': 'A commit is a snapshot of all staged changes, saved permanently in the repository with a unique hash, author info, and message.',
'quiz.b6.q': 'What does "git status" show?',
'quiz.b6.o1': 'The commit history',
'quiz.b6.o2': 'The current branch, staged changes, unstaged changes, and untracked files',
'quiz.b6.o3': 'Remote repository information',
'quiz.b6.o4': 'Configuration settings',
'quiz.b6.explain': '"git status" displays the state of the working directory and staging area, showing which changes are staged, unstaged, and untracked.',
'quiz.b7.q': 'Which flag is used to write a commit message inline?',
'quiz.b7.o1': '-a',
'quiz.b7.o2': '-msg',
'quiz.b7.o3': '-m',
'quiz.b7.o4': '--message-inline',
'quiz.b7.explain': 'The -m flag lets you write the commit message directly in the command: git commit -m "Your message here".',
'quiz.b8.q': 'What is the .git directory?',
'quiz.b8.o1': 'A directory containing your source code',
'quiz.b8.o2': 'A hidden directory containing all Git metadata and the object database',
'quiz.b8.o3': 'A configuration file for Git',
'quiz.b8.o4': 'A directory created on GitHub',
'quiz.b8.explain': 'The .git directory stores all the information Git needs: object database, refs, hooks, config, and more. Deleting it removes all version history.',

// Quiz questions — Intermediate
'quiz.i1.q': 'What is a fast-forward merge?',
'quiz.i1.o1': 'A merge that is faster than a normal merge',
'quiz.i1.o2': 'A merge where the target branch pointer moves forward to the feature branch tip without a merge commit',
'quiz.i1.o3': 'A merge that skips conflict resolution',
'quiz.i1.o4': 'A merge that only works on remote branches',
'quiz.i1.explain': 'A fast-forward merge occurs when there are no new commits on the target branch. Git simply moves the pointer forward — no merge commit needed.',
'quiz.i2.q': 'What is the difference between "git fetch" and "git pull"?',
'quiz.i2.o1': 'They are the same command with different names',
'quiz.i2.o2': 'Fetch downloads changes without merging; pull downloads AND merges',
'quiz.i2.o3': 'Fetch works with SSH; pull works with HTTPS',
'quiz.i2.o4': 'Pull downloads changes without merging; fetch downloads AND merges',
'quiz.i2.explain': '"git fetch" downloads data from the remote but leaves your working directory unchanged. "git pull" does a fetch followed by a merge into your current branch.',
'quiz.i3.q': 'What does "git remote -v" show?',
'quiz.i3.o1': 'The version of Git',
'quiz.i3.o2': 'The verbose commit log',
'quiz.i3.o3': 'The names and URLs of configured remote repositories',
'quiz.i3.o4': 'The list of virtual branches',
'quiz.i3.explain': '"git remote -v" shows the shortnames and corresponding URLs for the remote repositories configured for fetch and push.',
'quiz.i4.q': 'How do you create and switch to a new branch in one command?',
'quiz.i4.o1': 'git branch new-branch && git switch new-branch',
'quiz.i4.o2': 'git switch -c new-branch',
'quiz.i4.o3': 'git new-branch',
'quiz.i4.o4': 'git create new-branch',
'quiz.i4.explain': '"git switch -c branch-name" creates a new branch and switches to it. The older equivalent is "git checkout -b branch-name".',
'quiz.i5.q': 'What are the conflict markers in a merge conflict?',
'quiz.i5.o1': '<<< === >>>',
'quiz.i5.o2': '<<<<<<< ======= >>>>>>>',
'quiz.i5.o3': '### --- ###',
'quiz.i5.o4': '*** === ***',
'quiz.i5.explain': 'Git uses <<<<<<< to mark the start of your changes, ======= to separate the versions, and >>>>>>> to mark the end of the incoming changes.',
'quiz.i6.q': 'What is HEAD in Git?',
'quiz.i6.o1': 'The first commit in the repository',
'quiz.i6.o2': 'A pointer to the current branch reference (the latest commit on the current branch)',
'quiz.i6.o3': 'The main branch',
'quiz.i6.o4': 'The remote repository',
'quiz.i6.explain': 'HEAD is a special pointer that refers to the current branch reference. It typically points to the latest commit on your current branch.',
'quiz.i7.q': 'How do you delete a remote branch?',
'quiz.i7.o1': 'git branch -d remote/branch',
'quiz.i7.o2': 'git push origin --delete branch-name',
'quiz.i7.o3': 'git remote delete branch-name',
'quiz.i7.o4': 'git delete origin/branch-name',
'quiz.i7.explain': '"git push origin --delete branch-name" removes the branch from the remote repository.',
'quiz.i8.q': 'What does the -u flag do in "git push -u origin main"?',
'quiz.i8.o1': 'Updates the repository',
'quiz.i8.o2': 'Unlocks the branch for pushing',
'quiz.i8.o3': 'Sets the upstream tracking reference so future push/pull commands need no arguments',
'quiz.i8.o4': 'Uploads only untracked files',
'quiz.i8.explain': 'The -u (--set-upstream) flag creates a tracking relationship between local and remote branches, simplifying future push and pull commands.',

// Quiz questions — Advanced
'quiz.a1.q': 'What is rebasing in Git?',
'quiz.a1.o1': 'Renaming the base branch',
'quiz.a1.o2': 'Re-applying commits on top of a different base tip to create a linear history',
'quiz.a1.o3': 'Creating a backup of the repository',
'quiz.a1.o4': 'Resetting all branches to their initial state',
'quiz.a1.explain': 'Rebasing takes commits from a branch and re-applies them on top of another branch, creating a clean, linear history without merge commits.',
'quiz.a2.q': 'What is the difference between "git reset --soft" and "git reset --hard"?',
'quiz.a2.o1': 'Soft is faster than hard',
'quiz.a2.o2': 'Soft keeps changes staged; hard discards all changes permanently',
'quiz.a2.o3': 'There is no difference',
'quiz.a2.o4': 'Hard is only for remote repos; soft is for local',
'quiz.a2.explain': '--soft moves HEAD but keeps changes staged. --hard moves HEAD and discards ALL changes in the staging area and working directory — this is destructive.',
'quiz.a3.q': 'What is cherry-pick?',
'quiz.a3.o1': 'Selecting which files to include in a commit',
'quiz.a3.o2': 'Applying a specific commit from one branch onto another branch',
'quiz.a3.o3': 'Choosing which branch to merge',
'quiz.a3.o4': 'Picking the best merge strategy',
'quiz.a3.explain': '"git cherry-pick <hash>" takes a single commit from anywhere in the repository and applies it to your current branch as a new commit.',
'quiz.a4.q': 'When should you NOT rebase?',
'quiz.a4.o1': 'When working alone',
'quiz.a4.o2': 'When the commits have already been pushed to a shared/public branch',
'quiz.a4.o3': 'When using VSCode',
'quiz.a4.o4': 'When working with tags',
'quiz.a4.explain': 'Never rebase commits that exist on a shared remote branch. Rebasing rewrites history, causing conflicts for anyone who has based work on those commits.',
'quiz.a5.q': 'What does "git reflog" track?',
'quiz.a5.o1': 'Remote repository changes',
'quiz.a5.o2': 'Every update to the tip of branches and HEAD, including resets and rebases',
'quiz.a5.o3': 'File modification timestamps',
'quiz.a5.o4': 'Network connection logs',
'quiz.a5.explain': 'Reflog records every change to HEAD locally — commits, resets, rebases, checkouts. It is your safety net for recovering "lost" commits.',
'quiz.a6.q': 'What is an annotated tag?',
'quiz.a6.o1': 'A tag with comments in the code',
'quiz.a6.o2': 'A full tag object with tagger name, email, date, and message — recommended for releases',
'quiz.a6.o3': 'A tag that is automatically synced with remote',
'quiz.a6.o4': 'A tag that includes a code review',
'quiz.a6.explain': 'Annotated tags are full Git objects with metadata (name, email, date, message). Created with "git tag -a v1.0 -m message". Preferred for release versions.',
'quiz.a7.q': 'What is trunk-based development?',
'quiz.a7.o1': 'A workflow where branches are named after tree parts',
'quiz.a7.o2': 'A workflow where all developers commit to a single main branch using short-lived feature branches',
'quiz.a7.o3': 'A workflow that only works with SVN',
'quiz.a7.o4': 'A workflow where the main branch is deleted after each release',
'quiz.a7.explain': 'Trunk-Based Development has everyone commit to one "trunk" (main) branch. Feature branches are very short-lived. It emphasizes CI/CD and uses feature flags for incomplete work.',
'quiz.a8.q': 'What does "git stash pop" do?',
'quiz.a8.o1': 'Deletes the stash permanently',
'quiz.a8.o2': 'Applies the most recent stash and removes it from the stash list',
'quiz.a8.o3': 'Shows the stash contents',
'quiz.a8.o4': 'Creates a new stash',
'quiz.a8.explain': '"git stash pop" applies the most recent stash (stash@{0}) to your working directory and removes it from the stash list. Use "apply" to keep the stash.'
},

ar: {
// Loader
'loader.text': 'جاري تهيئة GitMaster Pro...',
// Nav
'nav.brand': 'GitMaster Pro',
'nav.home': 'الرئيسية',
'nav.learn': 'تعلّم',
'nav.terminal': 'الطرفية',
'nav.visualizer': 'المرئيات',
'nav.cheatsheet': 'مرجع سريع',
'nav.quiz': 'اختبارات',
'nav.langToggle': 'English',
// Hero
'hero.title': 'GitMaster Pro',
'hero.subtitle': 'تعلّم Git بشكل تفاعلي. تدرّب على الأوامر، تصوّر سير العمل، وأتقن إدارة الإصدارات.',
'hero.stat.modules': 'وحدات تعليمية',
'hero.stat.commands': 'أوامر',
'hero.stat.os': 'أنظمة تشغيل',
'hero.stat.languages': 'لغات',
'hero.badge': 'منصة تعلّم Git التفاعلية',
'hero.cta.start': 'ابدأ التعلم',
'hero.cta.terminal': 'جرّب الطرفية',
'hero.cta.cheatsheet': 'المرجع السريع',
// Features
'features.title': 'لماذا GitMaster Pro؟',
'features.subtitle': 'كل ما تحتاجه لإتقان Git في مكان واحد',
'features.terminal.title': 'طرفية تفاعلية',
'features.terminal.desc': 'تدرّب على أوامر Git في بيئة طرفية محاكاة آمنة دون التأثير على مستودعات حقيقية.',
'features.visualizer.title': 'رسم بياني مرئي لـ Git',
'features.visualizer.desc': 'شاهد الإيداعات والفروع وعمليات الدمج تنبض بالحياة مع رسوم بيانية متحركة للإيداعات.',
'features.multios.title': 'دعم أنظمة تشغيل متعددة',
'features.multios.desc': 'تعليمات مخصصة لأنظمة ويندوز وماك ولينكس. بدّل نظام التشغيل لترى الأوامر الخاصة بكل منصة فوراً.',
'features.vscode.title': 'تكامل مع VSCode',
'features.vscode.desc': 'تعلّم كيفية استخدام Git مباشرة داخل Visual Studio Code مع إرشادات ونصائح عملية.',
'features.bilingual.title': 'محتوى ثنائي اللغة',
'features.bilingual.desc': 'دعم كامل للغتين الإنجليزية والعربية مع تخطيط RTL صحيح، مما يجعل Git في متناول جمهور أوسع.',
'features.progress.title': 'تتبع التقدم',
'features.progress.desc': 'تابع مسيرة تعلمك مع مؤشرات الإنجاز والاختبارات والإنجازات المرحلية.',
// Learning Path
'learning.title': 'مسار التعلم',
'learning.subtitle': 'اتبع منهجاً منظماً من أساسيات Git إلى سير العمل المتقدمة',
'learning.filter.all': 'الكل',
'learning.filter.beginner': 'مبتدئ',
'learning.filter.intermediate': 'متوسط',
'learning.filter.advanced': 'متقدم',
'learning.progress.title': 'التقدم العام',
// Module view
'module.back': '<i class="fa-solid fa-arrow-left"></i> العودة للوحدات',
'module.title': 'عنوان الوحدة',
'module.progress': 'التقدم: 0%',
'module.prev': 'الوحدة السابقة',
'module.next': 'الوحدة التالية',
'module.markComplete': 'وضع علامة مكتمل',
'module.completed': 'مكتمل',
'module.minutes': 'دقيقة',
'module.steps': 'خطوات',
'module.start': 'ابدأ',
'module.continue': 'متابعة',
'step.output': 'المخرجات',
'step.run': 'تشغيل',
'step.running': 'جارٍ التشغيل...',
'step.executed': 'تم التنفيذ',
'step.vscode': 'VSCode',
'step.tip': 'نصيحة',
'step.warning': 'تحذير',
'step.whatHappened': 'ماذا حدث',
// Step explanations (Arabic)
'mod1.s4.explain': 'طبع Git رقم الإصدار المثبت. هذا يؤكد أن Git مثبت بشكل صحيح وجاهز للاستخدام.',
'mod2.s1.explain': 'تم تنزيل مثبّت Git. بعد تشغيله، أصبح Git متاحاً كأداة سطر أوامر.',
'mod2.s2.explain': 'أكد Git رقم إصداره، مما يثبت نجاح التثبيت.',
'mod2.s5.explain': 'تم تعيين VS Code كمحرر افتراضي لـ Git. عندما يحتاج Git لكتابة رسالة، سيفتح VS Code.',
'mod3.s1.explain': 'تم حفظ اسمك في إعدادات Git العامة. سيظهر هذا الاسم في كل إيداع تقوم به.',
'mod3.s2.explain': 'تم حفظ بريدك الإلكتروني في إعدادات Git العامة. يربط هذا البريد إيداعاتك بهويتك.',
'mod3.s3.explain': 'تم تعيين اسم الفرع الافتراضي إلى "main". ستستخدم المستودعات الجديدة "main" بدلاً من "master".',
'mod3.s4.explain': 'تم إعداد VS Code كمحرر نصوص افتراضي لـ Git لرسائل الإيداع والعمليات التفاعلية.',
'mod3.s5.explain': 'تم تفعيل المخرجات الملونة. سيُبرز Git التغييرات والفروع ومعلومات الحالة بألوان مختلفة.',
'mod3.s6.explain': 'عرض Git جميع إعدادات التكوين الحالية، مُظهراً كل خيار تم ضبطه عالمياً ومحلياً.',
'mod4.s1.explain': 'تم إنشاء مجلد جديد باسم "my-project" وانتقلت إليه. سيكون هذا جذر مشروع Git الخاص بك.',
'mod4.s2.explain': 'أنشأ Git مجلد .git مخفياً داخل مشروعك. يخزن هذا المجلد كل سجل الإصدارات والفروع والإعدادات. مجلدك أصبح الآن مستودع Git!',
'mod4.s3.explain': 'فحصت بنية مجلد .git. يحتوي على: HEAD (مؤشر الفرع الحالي)، config، hooks، objects (البيانات المخزنة)، وrefs (مؤشرات الفروع/العلامات).',
'mod4.s4.explain': 'تم إنشاء ملف README.md جديد. هذا الملف غير متتبع بعد — موجود فقط في مجلد العمل.',
'mod4.s5.explain': 'أظهر git status أن README.md "ملف غير متتبع" باللون الأحمر. يرى Git الملف لكنه لا يتتبع تغييراته بعد. تحتاج "git add" لبدء التتبع.',
'mod4.s6.explain': 'راجعت سير عمل Git الأساسي: تعديل الملفات ← تجهيز التغييرات (git add) ← إيداع اللقطة (git commit). تتكرر هذه الدورة مع كل تغيير.',
'mod5.s1.explain': 'كشف git status عن ملفات غير متتبعة في مجلد العمل. هذه الملفات موجودة لكن Git لا يعرف عنها شيئاً بعد.',
'mod5.s2.explain': 'تم نقل README.md من مجلد العمل إلى منطقة التجهيز. الآن هو في قائمة الانتظار وجاهز للإيداع التالي.',
'mod5.s3.explain': 'النقطة (.) تخبر Git بتجهيز جميع التغييرات — ملفات جديدة ومعدلة ومحذوفة. كل شيء الآن في منطقة التجهيز.',
'mod5.s4.explain': 'يُظهر git status الآن README.md تحت "تغييرات جاهزة للإيداع" باللون الأخضر. انتقل الملف من غير متتبع ← مُجهّز.',
'mod5.s5.explain': 'تم حفظ لقطة من تغييراتك المُجهّزة كإيداع دائم. للإيداع رمز فريد (a1b2c3d) ومعلومات المؤلف والرسالة.',
'mod5.s6.explain': 'يُظهر git log سجل الإيداعات. يمكنك رؤية رمز كل إيداع ومؤلفه وتاريخه ورسالته. العلم --oneline يعرض تنسيقاً مختصراً.',
'mod5.s7.explain': 'ثلاث عمليات دفعة واحدة: تعديل الملف، تجهيزه بـ "git add"، ثم إيداعه. هذا هو سير العمل المعياري.',
'mod5.s8.explain': 'يُظهر git diff التغييرات بالتفصيل سطراً بسطر. الأسطر التي تبدأ بـ + إضافات، والتي تبدأ بـ - حذوفات.',
'mod6.s1.explain': 'عرض Git سجل الإيداعات الكامل بمعلومات مفصلة: الرمز والمؤلف والتاريخ والرسالة لكل إيداع.',
'mod6.s2.explain': 'العلم --graph يُظهر بنية الفروع بصرياً. --oneline يجعل كل إيداع سطراً واحداً. --all يُظهر كل الفروع.',
'mod6.s3.explain': 'سلاسل التنسيق المخصصة تتحكم بالمعلومات المعروضة: %h=رمز مختصر، %an=اسم المؤلف، %ar=تاريخ نسبي، %s=رسالة.',
'mod6.s4.explain': 'يعرض git show كل شيء عن إيداع محدد: فرق التغييرات الكامل ومعلومات المؤلف والتاريخ والرسالة.',
'mod6.s5.explain': '"git diff" يُظهر التغييرات غير المُجهّزة. "git diff --staged" يُظهر التغييرات المُجهّزة. معاً يغطيان كل التغييرات المعلقة.',
'mod6.s6.explain': 'يُظهر git blame من عدّل آخر مرة كل سطر في الملف، مع رمز الإيداع والتاريخ. مفيد لفهم متى ولماذا تم تغيير سطر.',
'mod7.s2.explain': 'عرض Git قائمة الفروع المحلية. النجمة (*) تُحدد الفرع النشط الحالي. حالياً يوجد فقط "main".',
'mod7.s3.explain': 'تم إنشاء فرع جديد "feature-login" يشير لنفس الإيداع. لم تتغير أي ملفات — إنه مجرد مؤشر جديد.',
'mod7.s4.explain': 'انتقلت إلى فرع "feature-login". أي إيداعات جديدة ستُضاف لهذا الفرع وليس main.',
'mod7.s5.explain': 'العلم -c يُنشئ وينتقل لفرع جديد في أمر واحد. "feature-signup" موجود الآن وهو فرعك النشط.',
'mod7.s6.explain': 'تم إنشاء ملف جديد وتجهيزه وإيداعه — كل ذلك على فرع feature-login. هذا الإيداع موجود فقط على هذا الفرع.',
'mod7.s7.explain': 'تم حذف الفرع. العلم -d يعمل فقط إذا تم دمج الفرع بالكامل. استخدم -D للحذف القسري (احذر — ستفقد الإيداعات غير المدمجة).',
'mod8.s2.explain': 'عدت إلى الفرع الرئيسي main. مجلد عملك يعكس الآن حالة main — ملفات الميزة مخفية مؤقتاً.',
'mod8.s3.explain': 'تم دمج فرع feature-login في main. "Fast-forward" يعني أن main تقدم ببساطة ليشمل الإيداعات الجديدة.',
'mod8.s6.explain': 'يُظهر الرسم البياني سجل الدمج بصرياً. يمكنك رؤية أين تفرّع فرع الميزة وأين تم دمجه مجدداً.',
'mod8.s7.explain': 'تم تنظيف فرع الميزة بعد الدمج. من الممارسات الجيدة حذف الفروع بعد دمجها للحفاظ على نظافة المستودع.',
'mod9.s3.explain': 'تمت إضافة جهاز بعيد "origin" يشير إلى عنوان مستودع GitHub. "origin" هو الاسم التقليدي للجهاز البعيد الرئيسي.',
'mod9.s4.explain': 'عرض Git عناوين URL البعيدة لعمليتي الجلب والدفع. هذا يؤكد ربط مستودعك بـ GitHub.',
'mod9.s5.explain': 'تم رفع جميع الإيداعات المحلية إلى GitHub. العلم -u يُعدّ التتبع ليعرف "git push" المستقبلي وجهة الدفع تلقائياً.',
'mod9.s6.explain': 'تم إنشاء زوج مفاتيح SSH. المفتاح الخاص يبقى على جهازك؛ المفتاح العام (.pub) يُضاف إلى GitHub للمصادقة الآمنة.',
'mod9.s7.explain': 'تم نسخ مفتاح SSH العام إلى الحافظة. ستلصقه في GitHub ← الإعدادات ← مفاتيح SSH.',
'mod9.s8.explain': 'تم تنزيل المستودع البعيد بالكامل إلى جهازك، بما في ذلك كل الفروع وسجل الإيداعات.',
'mod10.s1.explain': 'تم استنساخ المستودع البعيد إلى جهازك المحلي. لديك الآن نسخة كاملة مع كل السجل.',
'mod10.s2.explain': 'نزّل Git أحدث التغييرات من البعيد لكن لم يطبقها على ملفاتك. التغييرات مخزنة في origin/main للمراجعة أولاً.',
'mod10.s3.explain': 'قام Git بسحب (جلب + دمج) أحدث التغييرات من البعيد. ملفاتك محدثة الآن مع البعيد.',
'mod10.s5.explain': 'تم دفع إيداعاتك المحلية إلى المستودع البعيد. يمكن لأعضاء الفريق الآخرين رؤية وسحب تغييراتك.',
'mod10.s6.explain': 'عرض Git قائمة فروع التتبع البعيدة وأعدّ التتبع بين فرعك المحلي main وorigin/main.',
'mod11.s2.explain': 'عدّل فرعان نفس الملف بشكل مختلف، مما تسبب في تعارض دمج. لا يمكن لـ Git أن يقرر تلقائياً — عليك حله يدوياً.',
'mod11.s3.explain': 'علامات التعارض تُظهر كلا الإصدارين: <<<<<<< HEAD هو فرعك الحالي، ======= يفصل بينهما، و>>>>>>> branch-b هو الفرع القادم.',
'mod11.s4.explain': 'بعد تعديل الملف يدوياً لحل التعارض، "git add" يُحدد التعارض كمحلول.',
'mod11.s6.explain': 'تم إيداع الملف المحلول، مُكملاً عملية الدمج. التعارض الآن محلول بشكل دائم في سجل المشروع.',
'mod11.s7.explain': 'تم إلغاء الدمج واستعادة كل شيء للحالة قبل بدء الدمج. استخدم هذا عندما تريد البدء من جديد.',
'mod12.s2.explain': 'أعاد Rebase تطبيق إيداعات فرع الميزة فوق آخر main. هذا يُنشئ سجلاً خطياً بدون إيداعات دمج.',
'mod12.s4.explain': 'يُظهر Rebase التفاعلي آخر 3 إيداعات مع خيارات: pick (إبقاء)، reword (تغيير الرسالة)، squash (دمج)، drop (حذف).',
'mod12.s5.explain': 'تم ضغط ثلاث إيداعات في إيداع نظيف واحد. مفيد لدمج إيداعات "WIP" قبل الدمج في main.',
'mod12.s7.explain': 'تم إلغاء Rebase واستعادة فرعك لحالته السابقة. لم تُفقد أي إيداعات.',
'mod13.s2.explain': 'تم حفظ تغييراتك غير المودعة في مكدس التخزين المؤقت وتنظيف مجلد عملك. يمكنك الآن تبديل الفروع بأمان.',
'mod13.s3.explain': 'عرض Git كل التخزينات المحفوظة في قائمة مرقمة. كل عنصر يُظهر الفرع والإيداع والرسالة الاختيارية.',
'mod13.s4.explain': '"stash pop" استعاد تغييراتك المحفوظة إلى مجلد العمل وأزال إدخال التخزين. استخدم "apply" للإبقاء على التخزين.',
'mod13.s5.explain': 'تم حذف إدخال التخزين المحدد نهائياً من القائمة. التغييرات في ذلك التخزين اختفت الآن.',
'mod13.s7.explain': 'تم نسخ إيداع محدد من فرع آخر إلى فرعك الحالي. على عكس الدمج، cherry-pick يجلب إيداعاً واحداً فقط.',
'mod14.s1.explain': 'تمت استعادة الملف لحالته في آخر إيداع. كل التغييرات غير المودعة في مجلد العمل تم تجاهلها — لا يمكن التراجع!',
'mod14.s2.explain': 'تمت إزالة الملف من منطقة التجهيز إلى مجلد العمل. تغييراتك لا تزال موجودة، لكن لم تعد مُجهّزة للإيداع.',
'mod14.s3.explain': 'تم التراجع عن آخر إيداع، لكن التغييرات محفوظة في منطقة التجهيز. يمكنك التعديل وإعادة الإيداع.',
'mod14.s4.explain': 'تم التراجع عن آخر إيداع ونُقلت التغييرات إلى مجلد العمل (غير مُجهّزة). تحتاج "git add" مجدداً قبل الإيداع.',
'mod14.s5.explain': 'تم مسح آخر إيداع بالكامل — الإيداع وجميع التغييرات اختفت نهائياً. هذا أمر مدمر ولا يمكن التراجع عنه!',
'mod14.s6.explain': 'تم إنشاء إيداع جديد يعكس تغييرات الإيداع المحدد. على عكس reset، يحافظ revert على السجل — يُضيف ولا يحذف.',
'mod14.s8.explain': 'يُظهر Reflog كل موقع كان فيه HEAD. حتى بعد reset أو rebase، يمكنك إيجاد الإيداعات "المفقودة" واستعادتها.',
'mod15.s1.explain': 'تم إنشاء ملف .gitignore بقواعد لاستبعاد: node_modules وملفات .env وملفات السجل ومجلد dist من تتبع Git.',
'mod15.s2.explain': 'تم إعداد .gitignore عام. الأنماط في هذا الملف تنطبق على جميع مستودعاتك — مفيد لملفات نظام التشغيل وإعدادات IDE.',
'mod15.s3.explain': 'تم إنشاء علامة خفيفة عند الإيداع الحالي. إنها مجرد تسمية — مؤشر مسمى لإيداع محدد.',
'mod15.s4.explain': 'تم إنشاء علامة مشروحة برسالة. العلامات المشروحة تخزن اسم المُعلّم والتاريخ والرسالة — موصى بها للإصدارات.',
'mod15.s5.explain': 'تم دفع جميع العلامات المحلية إلى المستودع البعيد. العلامات لا تُدفع افتراضياً مع "git push".',
'mod16.s4.explain': 'تم إنشاء ثلاث إيداعات بتنسيق Conventional Commits: feat (ميزة جديدة)، fix (إصلاح خطأ)، docs (توثيق). يُمكّن من إنشاء سجل تغييرات تلقائي.',
// Terminal
'terminal.title': 'طرفية Git التفاعلية',
'terminal.subtitle': 'تدرّب على أوامر Git في بيئة محاكاة آمنة',
'terminal.quickCommands': 'أوامر سريعة',
'terminal.help.text': '<i class="fa-solid fa-circle-info"></i> اكتب <code>help</code> لرؤية جميع الأوامر المتاحة، أو انقر على أمر سريع أعلاه لتجربته.',
'terminal.challenge': 'تحدي',
'terminal.state.branch': 'الفرع',
'terminal.state.files': 'مستكشف الملفات',
'terminal.state.commits': 'الإيداعات',
'terminal.state.noFiles': 'لا ملفات بعد — جرّب touch file.txt',
'terminal.state.noCommits': 'لا إيداعات بعد',
'terminal.achievements': 'الإنجازات',
'terminal.history': 'السجل',
'terminal.history.empty': 'ستظهر الأوامر هنا...',
'terminal.export': 'تصدير .sh',
'terminal.reset': 'إعادة تعيين',
'terminal.mistake.title': 'خطأ شائع',
'terminal.mistake.fix': 'استخدم هذا بدلاً',
'terminal.ch.level.beginner': 'مبتدئ',
'terminal.ch.level.intermediate': 'متوسط',
'terminal.ch.level.advanced': 'متقدم',
'terminal.ch.firstCommit': 'أول إيداع',
'terminal.ch.branching': 'فرع ودمج',
'terminal.ch.basicStatus': 'الحالة والسجل',
'terminal.ch.remote': 'دفع بعيد',
'terminal.ch.stash': 'تدفق Stash',
'terminal.ch.tagging': 'وسم الإصدارات',
'terminal.ch.diff': 'الفرق والفحص',
'terminal.ch.undo': 'التراجع عن التغييرات',
'terminal.ch.cherryPick': 'Cherry Pick',
'terminal.ch.rebase': 'تدفق Rebase',
'terminal.ch.started': 'بدأ التحدي',
'terminal.ch.select': 'اختر تحدياً أعلاه لبدء تمرين موجّه',
'terminal.ch.complete': 'اكتمل التحدي!',
'terminal.ch.nextChallenge': 'التحدي التالي',
'terminal.ch.reset': 'إعادة تعيين التقدم',
'terminal.ch.step': 'خطوة',
'terminal.ch.firstCommit.desc': 'تعلّم سير عمل Git الأساسي: تهيئة مستودع، إنشاء ملف، تجهيزه، وعمل أول إيداع.',
'terminal.ch.firstCommit.s1': 'تهيئة مستودع Git جديد',
'terminal.ch.firstCommit.s1.hint': 'git init',
'terminal.ch.firstCommit.s2': 'إنشاء ملف README لمشروعك',
'terminal.ch.firstCommit.s2.hint': 'touch README.md',
'terminal.ch.firstCommit.s3': 'تجهيز الملف ليتتبعه Git',
'terminal.ch.firstCommit.s3.hint': 'git add .',
'terminal.ch.firstCommit.s4': 'إيداع التغييرات المُجهّزة برسالة',
'terminal.ch.firstCommit.s4.hint': 'git commit -m "Initial commit"',
'terminal.ch.branching.desc': 'أنشئ فرعاً، أجرِ تغييرات، عُد إلى main، وادمج عملك.',
'terminal.ch.branching.s1': 'تهيئة مستودع Git جديد',
'terminal.ch.branching.s1.hint': 'git init',
'terminal.ch.branching.s2': 'إنشاء والانتقال إلى فرع جديد',
'terminal.ch.branching.s2.hint': 'git switch -c feature',
'terminal.ch.branching.s3': 'إنشاء ملف على فرعك',
'terminal.ch.branching.s3.hint': 'touch feature.txt',
'terminal.ch.branching.s4': 'تجهيز الملف الجديد',
'terminal.ch.branching.s4.hint': 'git add .',
'terminal.ch.branching.s5': 'إيداع التغييرات على الفرع',
'terminal.ch.branching.s5.hint': 'git commit -m "Add feature"',
'terminal.ch.branching.s6': 'العودة إلى الفرع الرئيسي',
'terminal.ch.branching.s6.hint': 'git switch main',
'terminal.ch.branching.s7': 'دمج فرع الميزة في main',
'terminal.ch.branching.s7.hint': 'git merge feature',
'terminal.ch.basicStatus.desc': 'استخدم git status وgit log لفهم حالة مستودعك في كل خطوة.',
'terminal.ch.basicStatus.s1': 'تهيئة مستودع Git جديد',
'terminal.ch.basicStatus.s1.hint': 'git init',
'terminal.ch.basicStatus.s2': 'إنشاء ملف',
'terminal.ch.basicStatus.s2.hint': 'touch index.html',
'terminal.ch.basicStatus.s3': 'فحص الحالة — شاهد الملفات غير المتتبعة',
'terminal.ch.basicStatus.s3.hint': 'git status',
'terminal.ch.basicStatus.s4': 'تجهيز الملف',
'terminal.ch.basicStatus.s4.hint': 'git add .',
'terminal.ch.basicStatus.s5': 'فحص الحالة مجدداً — شاهد التغييرات المُجهّزة',
'terminal.ch.basicStatus.s5.hint': 'git status',
'terminal.ch.basicStatus.s6': 'إيداع التغييرات',
'terminal.ch.basicStatus.s6.hint': 'git commit -m "Add index"',
'terminal.ch.basicStatus.s7': 'عرض سجل الإيداعات',
'terminal.ch.basicStatus.s7.hint': 'git log --oneline',
'terminal.ch.remote.desc': 'إعداد مستودع بعيد، إنشاء إيداع، ودفع عملك إلى الخادم.',
'terminal.ch.remote.s1': 'تهيئة مستودع Git جديد',
'terminal.ch.remote.s1.hint': 'git init',
'terminal.ch.remote.s2': 'إضافة عنوان URL للمستودع البعيد',
'terminal.ch.remote.s2.hint': 'git remote add origin https://...',
'terminal.ch.remote.s3': 'إنشاء ملف',
'terminal.ch.remote.s3.hint': 'touch app.js',
'terminal.ch.remote.s4': 'تجهيز جميع الملفات',
'terminal.ch.remote.s4.hint': 'git add .',
'terminal.ch.remote.s5': 'إيداع التغييرات',
'terminal.ch.remote.s5.hint': 'git commit -m "First push"',
'terminal.ch.remote.s6': 'الدفع إلى المستودع البعيد',
'terminal.ch.remote.s6.hint': 'git push -u origin main',
'terminal.ch.stash.desc': 'احفظ عملك غير المُودع مؤقتاً باستخدام git stash، ثم استعده لاحقاً.',
'terminal.ch.stash.s1': 'تهيئة مستودع وعمل إيداع',
'terminal.ch.stash.s1.hint': 'git init',
'terminal.ch.stash.s2': 'إنشاء وتجهيز ملف',
'terminal.ch.stash.s2.hint': 'touch file.txt',
'terminal.ch.stash.s3': 'تجهيز الملف',
'terminal.ch.stash.s3.hint': 'git add .',
'terminal.ch.stash.s4': 'إيداع الملف',
'terminal.ch.stash.s4.hint': 'git commit -m "Base commit"',
'terminal.ch.stash.s5': 'تعديل أو إنشاء ملف آخر',
'terminal.ch.stash.s5.hint': 'touch temp.txt',
'terminal.ch.stash.s6': 'تخزين تغييراتك غير المُودعة',
'terminal.ch.stash.s6.hint': 'git stash',
'terminal.ch.stash.s7': 'استعادة التغييرات المخزنة',
'terminal.ch.stash.s7.hint': 'git stash pop',
'terminal.ch.tagging.desc': 'تعلّم وسم إيداعات محددة كإصدارات باستخدام العلامات الخفيفة والمشروحة.',
'terminal.ch.tagging.s1': 'تهيئة مستودع',
'terminal.ch.tagging.s1.hint': 'git init',
'terminal.ch.tagging.s2': 'إنشاء ملف وإيداعه',
'terminal.ch.tagging.s2.hint': 'touch app.js',
'terminal.ch.tagging.s3': 'تجهيز وإيداع',
'terminal.ch.tagging.s3.hint': 'git add .',
'terminal.ch.tagging.s4': 'إيداع الملف',
'terminal.ch.tagging.s4.hint': 'git commit -m "v1 release"',
'terminal.ch.tagging.s5': 'إنشاء علامة خفيفة',
'terminal.ch.tagging.s5.hint': 'git tag v1.0',
'terminal.ch.tagging.s6': 'عرض جميع العلامات',
'terminal.ch.tagging.s6.hint': 'git tag',
'terminal.ch.diff.desc': 'فحص التغييرات في مجلد عملك باستخدام git diff قبل وبعد التجهيز.',
'terminal.ch.diff.s1': 'تهيئة مستودع',
'terminal.ch.diff.s1.hint': 'git init',
'terminal.ch.diff.s2': 'إنشاء ملف وإيداعه',
'terminal.ch.diff.s2.hint': 'touch style.css',
'terminal.ch.diff.s3': 'تجهيز وإيداع',
'terminal.ch.diff.s3.hint': 'git add .',
'terminal.ch.diff.s4': 'إيداع الملف',
'terminal.ch.diff.s4.hint': 'git commit -m "Add styles"',
'terminal.ch.diff.s5': 'تعديل الملف (محاكاة)',
'terminal.ch.diff.s5.hint': 'echo "body{}" >> style.css',
'terminal.ch.diff.s6': 'عرض فرق التغييرات غير المُجهّزة',
'terminal.ch.diff.s6.hint': 'git diff',
'terminal.ch.diff.s7': 'تجهيز وإيداع التغييرات',
'terminal.ch.diff.s7.hint': 'git add .',
'terminal.ch.diff.s8': 'إيداع التحديث',
'terminal.ch.diff.s8.hint': 'git commit -m "Update styles"',
'terminal.ch.undo.desc': 'تعلّم التراجع عن الإيداعات باستخدام git reset وفحص النتيجة بـ git status.',
'terminal.ch.undo.s1': 'تهيئة مستودع',
'terminal.ch.undo.s1.hint': 'git init',
'terminal.ch.undo.s2': 'إنشاء ملف',
'terminal.ch.undo.s2.hint': 'touch main.js',
'terminal.ch.undo.s3': 'تجهيز الملف',
'terminal.ch.undo.s3.hint': 'git add .',
'terminal.ch.undo.s4': 'إيداع',
'terminal.ch.undo.s4.hint': 'git commit -m "Add main"',
'terminal.ch.undo.s5': 'عرض سجل الإيداعات',
'terminal.ch.undo.s5.hint': 'git log --oneline',
'terminal.ch.undo.s6': 'التراجع عن آخر إيداع (الإبقاء على التغييرات مُجهّزة)',
'terminal.ch.undo.s6.hint': 'git reset --soft HEAD~1',
'terminal.ch.undo.s7': 'فحص الحالة للتأكيد',
'terminal.ch.undo.s7.hint': 'git status',
'terminal.ch.cherryPick.desc': 'تطبيق إيداع محدد من فرع إلى آخر باستخدام cherry-pick.',
'terminal.ch.cherryPick.s1': 'تهيئة مستودع',
'terminal.ch.cherryPick.s1.hint': 'git init',
'terminal.ch.cherryPick.s2': 'إنشاء ملف وإيداعه على main',
'terminal.ch.cherryPick.s2.hint': 'touch base.txt',
'terminal.ch.cherryPick.s3': 'تجهيز وإيداع',
'terminal.ch.cherryPick.s3.hint': 'git add .',
'terminal.ch.cherryPick.s4': 'إيداع',
'terminal.ch.cherryPick.s4.hint': 'git commit -m "Base"',
'terminal.ch.cherryPick.s5': 'إنشاء والانتقال إلى فرع ميزة',
'terminal.ch.cherryPick.s5.hint': 'git switch -c feature',
'terminal.ch.cherryPick.s6': 'إنشاء ملف وإيداعه على فرع الميزة',
'terminal.ch.cherryPick.s6.hint': 'touch feature.txt',
'terminal.ch.cherryPick.s7': 'تجهيز وإيداع',
'terminal.ch.cherryPick.s7.hint': 'git add .',
'terminal.ch.cherryPick.s8': 'إيداع على الميزة',
'terminal.ch.cherryPick.s8.hint': 'git commit -m "Feature work"',
'terminal.ch.cherryPick.s9': 'العودة إلى main',
'terminal.ch.cherryPick.s9.hint': 'git switch main',
'terminal.ch.cherryPick.s10': 'تطبيق إيداع الميزة بـ cherry-pick',
'terminal.ch.cherryPick.s10.hint': 'git cherry-pick <hash>',
'terminal.ch.rebase.desc': 'إعادة كتابة سجل الإيداعات عبر rebase فرع على آخر للحصول على سجل أنظف.',
'terminal.ch.rebase.s1': 'تهيئة مستودع وعمل إيداع أساسي',
'terminal.ch.rebase.s1.hint': 'git init',
'terminal.ch.rebase.s2': 'إنشاء وإيداع ملف',
'terminal.ch.rebase.s2.hint': 'touch base.txt',
'terminal.ch.rebase.s3': 'تجهيز وإيداع',
'terminal.ch.rebase.s3.hint': 'git add .',
'terminal.ch.rebase.s4': 'إيداع',
'terminal.ch.rebase.s4.hint': 'git commit -m "Base"',
'terminal.ch.rebase.s5': 'إنشاء فرع ميزة',
'terminal.ch.rebase.s5.hint': 'git switch -c feature',
'terminal.ch.rebase.s6': 'عمل إيداع على فرع الميزة',
'terminal.ch.rebase.s6.hint': 'touch feature.txt',
'terminal.ch.rebase.s7': 'تجهيز وإيداع على الميزة',
'terminal.ch.rebase.s7.hint': 'git add .',
'terminal.ch.rebase.s8': 'إيداع',
'terminal.ch.rebase.s8.hint': 'git commit -m "Feature"',
'terminal.ch.rebase.s9': 'إعادة تأسيس الميزة على main',
'terminal.ch.rebase.s9.hint': 'git rebase main',
'ach.firstInit': 'أول تهيئة',
'ach.firstFile': 'منشئ ملفات',
'ach.firstStage': 'أول تجهيز',
'ach.firstCommit': 'أول إيداع',
'ach.fiveCommits': 'مشتعل',
'ach.branchCreate': 'تفرّع',
'ach.branchMerge': 'خبير دمج',
'ach.remoteSetup': 'متصل',
'ach.stashUse': 'محترف Stash',
'ach.tenCmds': 'مستخدم متقدم',
'ach.tagCreate': 'علّمه',
'ach.challengeComplete': 'مُتحدٍّ',
// Visualizer
'visualizer.title': 'مُصوِّر سير عمل Git',
'visualizer.subtitle': 'شاهد عمليات Git تنبض بالحياة مع رسوم بيانية متحركة للإيداعات',
'visualizer.btn.init': '<i class="fa-solid fa-play"></i> تهيئة',
'visualizer.btn.commit': '<i class="fa-solid fa-circle-check"></i> إيداع',
'visualizer.btn.branch': '<i class="fa-solid fa-code-branch"></i> فرع',
'visualizer.btn.merge': '<i class="fa-solid fa-code-merge"></i> دمج',
'visualizer.btn.reset': '<i class="fa-solid fa-rotate-left"></i> إعادة تعيين',
'visualizer.btn.clear': '<i class="fa-solid fa-trash"></i> مسح',
'visualizer.info.default': '<i class="fa-solid fa-circle-info"></i> انقر على <strong>تهيئة</strong> لإنشاء مستودع جديد والبدء في تصوير عمليات Git.',
'viz.area.working': 'مجلد العمل',
'viz.area.staging': 'منطقة التجهيز',
'viz.area.local': 'المستودع المحلي',
'viz.area.remote': 'المستودع البعيد',
'viz.nextsteps': 'الخطوات المقترحة',
'viz.diagram': 'المخطط التوضيحي',
'viz.commit.branch': 'الفرع:',
'viz.commit.message': 'الرسالة:',
'viz.next.addFile': 'جهّز تغييراتك باستخدام git add',
'viz.next.commit': 'أودع تغييراتك المجهزة',
'viz.next.createBranch': 'أنشئ فرعاً جديداً لميزة',
'viz.next.push': 'ادفع التغييرات إلى المستودع البعيد',
'viz.next.moreCommits': 'استمر في إضافة الإيداعات',
'viz.next.commitBranch': 'أضف إيداعات إلى فرع {branch}',
'viz.next.switchBranch': 'انتقل بين الفروع باستخدام git switch',
'viz.next.mergeLater': 'ادمج الفرع عندما يكون جاهزاً',
'viz.next.deleteBranch': 'نظّف بحذف الفرع بعد الدمج',
'viz.next.newFeature': 'ابدأ فرع ميزة جديد',
'viz.practices.title': 'أفضل الممارسات والأخطاء الشائعة',
'viz.practices.best': 'أفضل الممارسات',
'viz.practices.pitfalls': 'الأخطاء الشائعة',
'viz.bp1.title': 'اكتب رسائل إيداع واضحة',
'viz.bp1.good': 'git commit -m "fix: حل مشكلة انتهاء وقت تسجيل الدخول"',
'viz.bp1.bad': 'git commit -m "تعديلات"',
'viz.bp1.why': 'الرسائل الواضحة تساعد الفريق على فهم التغييرات دون قراءة الكود.',
'viz.bp2.title': 'أودع باستمرار وادفع بانتظام',
'viz.bp2.good': 'إيداعات صغيرة مركزة: ميزة أو إصلاح واحد لكل إيداع',
'viz.bp2.bad': 'إيداع ضخم واحد يحتوي 50 ملفاً معدلاً',
'viz.bp2.why': 'الإيداعات الصغيرة أسهل في المراجعة والتراجع والتتبع.',
'viz.bp3.title': 'اسحب قبل الدفع دائماً',
'viz.bp3.good': 'git pull origin main → حل التعارضات → git push',
'viz.bp3.bad': 'git push (مرفوض لأن هناك تغييرات عن بُعد)',
'viz.bp3.why': 'يتجنب تعارضات الدمج والدفع المرفوض.',
'viz.bp4.title': 'استخدم الفروع للميزات',
'viz.bp4.good': 'git switch -c feature/auth → عمل → دمج → حذف الفرع',
'viz.bp4.bad': 'الإيداع مباشرة على main',
'viz.bp4.why': 'الفروع تعزل العمل وتمكّن مراجعة الكود عبر طلبات السحب.',
'viz.bp5.title': 'لا تدفع إجبارياً على الفروع المشتركة',
'viz.bp5.good': 'git push (دفع عادي)',
'viz.bp5.bad': 'git push --force origin main',
'viz.bp5.why': 'الدفع الإجباري يحذف التاريخ — يفقد المطورون الآخرون عملهم.',
'viz.bp6.title': 'راجع التغييرات قبل الإيداع',
'viz.bp6.good': 'git diff --staged → مراجعة → git commit',
'viz.bp6.bad': 'git add . && git commit -m "done" (بدون مراجعة)',
'viz.bp6.why': 'يمنع إيداع كود التصحيح أو المعلومات السرية عن طريق الخطأ.',
// Cheatsheet
'cheatsheet.title': 'المرجع السريع لأوامر Git',
'cheatsheet.subtitle': 'مرجع سريع لأكثر أوامر Git استخداماً',
'cheatsheet.searchPlaceholder': 'ابحث عن أوامر...',
// Quiz
'quiz.title': 'اختبر معلوماتك',
'quiz.subtitle': 'تحدَّ نفسك باختبارات Git بمستويات صعوبة مختلفة',
'quiz.level.beginner': '<i class="fa-solid fa-seedling"></i> مبتدئ',
'quiz.level.intermediate': '<i class="fa-solid fa-tree"></i> متوسط',
'quiz.level.advanced': '<i class="fa-solid fa-mountain"></i> متقدم',
'quiz.score': 'النتيجة:',
'quiz.result.title': 'اكتمل الاختبار!',
'quiz.result.retry': '<i class="fa-solid fa-rotate"></i> أعد المحاولة',
'quiz.result.perfect': 'نتيجة مثالية! أنت خبير في Git!',
'quiz.result.great': 'عمل رائع! لديك فهم قوي لـ Git.',
'quiz.result.good': 'جهد جيد! راجع المواضيع التي أخطأت فيها وحاول مرة أخرى.',
'quiz.result.retry_msg': 'واصل التدرب! راجع الوحدات وحاول مجدداً.',
// Workflows
'workflows.title': 'استراتيجيات وسير عمل Git',
'workflows.subtitle': 'استكشف استراتيجيات التفريع الشائعة المستخدمة من قبل فرق التطوير حول العالم',
'workflows.tab.gitflow': '<i class="fa-solid fa-code-branch"></i> GitFlow',
'workflows.tab.githubflow': '<i class="fa-brands fa-github"></i> GitHub Flow',
'workflows.tab.trunk': '<i class="fa-solid fa-timeline"></i> التطوير القائم على الجذع',
'workflows.gitflow.title': 'سير عمل GitFlow',
'workflows.gitflow.desc': 'GitFlow هو نموذج تفريع يستخدم فرعين رئيسيين دائمين (main و develop) مع فروع مساعدة (الميزات، الإصدارات، الإصلاحات العاجلة). مناسب للمشاريع ذات دورات الإصدار المجدولة.',
'workflows.githubflow.title': 'سير عمل GitHub Flow',
'workflows.githubflow.desc': 'GitHub Flow هو سير عمل مبسط يتمحور حول الفرع الرئيسي. ينشئ المطورون فروع ميزات، يفتحون طلبات سحب، يتلقون مراجعات، ثم يدمجون إلى main. يركز على النشر المستمر.',
'workflows.trunk.title': 'التطوير القائم على الجذع',
'workflows.trunk.desc': 'التطوير القائم على الجذع هو استراتيجية يلتزم فيها المطورون بإرسال تغييرات صغيرة ومتكررة مباشرة إلى الفرع الرئيسي أو عبر فروع ميزات قصيرة العمر جداً. يقلل من تعارضات الدمج ويدعم التكامل المستمر.',
// Footer
'footer.brand': 'GitMaster Pro',
'footer.description': 'دليل تعليمي شامل وتفاعلي لنظام Git مصمم لنقلك من مبتدئ تماماً إلى مستخدم Git واثق. صُنع بشغف للتعليم والمصادر المفتوحة.',
'footer.quickLinks': 'روابط سريعة',
'footer.createdBy': 'صنع بواسطة',
'footer.author.name': 'د. محمد عرفه',
'footer.author.title': 'أستاذ مساعد',
'footer.author.university': 'جامعة البتراء، الأردن',
'footer.author.portfolio': 'الملف الشخصي',
'footer.copyright': '© 2026 GitMaster Pro. جميع الحقوق محفوظة.',
'footer.powered': 'مدعوم من GitMaster Pro',
// Modal
'modal.title': 'تفاصيل الأمر',
'modal.close': 'إغلاق',
'modal.tryIt': '<i class="fa-solid fa-terminal"></i> جرّب في الطرفية',

// Module titles and descriptions
'mod1.title': 'ما هو Git؟ مقدمة في التحكم بالإصدارات',
'mod1.desc': 'تعلّم ما هو التحكم بالإصدارات، ولماذا Git هو المعيار الصناعي، وافهم المفاهيم الأساسية مثل المستودعات والإيداعات والفروع.',
'mod2.title': 'تثبيت Git وإعداد VSCode',
'mod2.desc': 'ثبّت Git على نظام التشغيل الخاص بك وقم بإعداد Visual Studio Code كمحرر Git الأساسي مع الإضافات الضرورية.',
'mod3.title': 'إعدادات Git',
'mod3.desc': 'قم بإعداد Git بهويتك والمحرر المفضل واسم الفرع الافتراضي وإعدادات أساسية أخرى.',
'mod4.title': 'مستودعك الأول',
'mod4.desc': 'أنشئ أول مستودع Git، افهم بنية مجلد .git، وتعرّف على منطقة التهيئة.',
'mod5.title': 'سير العمل الأساسي — add, commit, status',
'mod5.desc': 'أتقن سير عمل Git الأساسي: تهيئة التغييرات، إنشاء الإيداعات، وعرض تاريخ مشروعك.',
'mod6.title': 'عرض السجل وفهم التغييرات',
'mod6.desc': 'استكشف خيارات سجل Git القوية، قارن الفروقات بين الإيداعات، وتتبع التغييرات في قاعدة الشيفرة.',
'mod7.title': 'التفريع',
'mod7.desc': 'افهم مفاهيم التفريع، أنشئ وبدّل بين الفروع، ونظّم سير عمل التطوير.',
'mod8.title': 'دمج الفروع',
'mod8.desc': 'تعلّم الدمج السريع والدمج الثلاثي، اعرض سجل الدمج، ونظّف الفروع المدمجة.',
'mod9.title': 'المستودعات البعيدة و GitHub',
'mod9.desc': 'اربط مستودعك المحلي بـ GitHub، ادفع واسحب التغييرات، وأعدّ مصادقة SSH.',
'mod10.title': 'التعاون',
'mod10.desc': 'انسخ المستودعات، اجلب واسحب التغييرات البعيدة، تتبع الفروع البعيدة، واعمل مع طلبات السحب.',
'mod11.title': 'حل تعارضات الدمج',
'mod11.desc': 'افهم ما يسبب تعارضات الدمج، حدد علامات التعارض، وحلّ التعارضات يدوياً وفي VSCode.',
'mod12.title': 'إعادة القاعدة (Rebase)',
'mod12.desc': 'تعلّم الفرق بين rebase و merge، نفّذ rebase تفاعلي، ادمج الإيداعات، وافهم القاعدة الذهبية.',
'mod13.title': 'التخزين المؤقت واختيار الإيداعات',
'mod13.desc': 'احفظ العمل قيد التنفيذ مع stash، أدِر عدة تخزينات مؤقتة، وطبّق إيداعات محددة مع cherry-pick.',
'mod14.title': 'التراجع عن التغييرات',
'mod14.desc': 'أتقن طرق التراجع المختلفة: restore, reset (soft/mixed/hard), revert، واسترجع الإيداعات المفقودة مع reflog.',
'mod15.title': 'العلامات والإصدارات و .gitignore',
'mod15.desc': 'أنشئ ملفات .gitignore، ضع علامات على الإصدارات بعلامات خفيفة ومشروحة، وانشر إصدارات GitHub.',
'mod16.title': 'سير العمل الاحترافية',
'mod16.desc': 'استكشف GitFlow و GitHub Flow والتطوير القائم على الجذع. تعلّم اتفاقيات الإيداع وحماية الفروع ومراجعة الشيفرة.',

// Module 1 steps
'mod1.s1.title': 'ما هو التحكم بالإصدارات؟',
'mod1.s1.desc': 'أنظمة التحكم بالإصدارات (VCS) تتتبع التغييرات في الملفات بمرور الوقت، مما يتيح لك استرجاع إصدارات محددة لاحقاً. فكّر فيها كنظام تراجع غير محدود لمشروعك بالكامل. بدون VCS، يلجأ المطورون غالباً إلى نسخ المجلدات (مشروع-v1، مشروع-v2، مشروع-نهائي) وهي طريقة عرضة للأخطاء ولا تتوسع.',
'mod1.s2.title': 'لماذا Git؟',
'mod1.s2.desc': 'Git هو نظام تحكم بالإصدارات موزّع، مما يعني أن كل مطور لديه نسخة كاملة من تاريخ المستودع. بخلاف الأنظمة المركزية (SVN, CVS)، لا يعتمد Git على خادم مركزي. إنه سريع، يدعم التطوير غير الخطي من خلال التفريع، وهو المعيار الصناعي المستخدم من قبل ملايين المطورين حول العالم.',
'mod1.s3.title': 'مفاهيم Git الأساسية',
'mod1.s3.desc': 'المستودع (repo): مجلد يتتبعه Git يحتوي على جميع ملفات المشروع وتاريخه. الإيداع (commit): لقطة من مشروعك في نقطة زمنية. الفرع (branch): خط تطوير مستقل. منطقة التهيئة (Index): منطقة تحضيرية تحدد فيها التغييرات التي ستُدرج في الإيداع التالي.',
'mod1.s4.title': 'التحقق من تثبيت Git',
'mod1.s4.desc': 'قبل أن نبدأ، لنتحقق من أن Git مثبت على نظامك. شغّل الأمر التالي في الطرفية. إذا كان Git مثبتاً، سترى رقم الإصدار.',
'mod1.s4.vscode': 'في VSCode، افتح الطرفية المدمجة بـ Ctrl+` (الفاصلة العليا). اكتب الأمر هناك للتحقق من إصدار Git.',
'mod1.s4.tip': 'إذا ظهرت رسالة "command not found"، فإن Git غير مثبت بعد. انتقل إلى الوحدة 2 لتعليمات التثبيت.',

// Module 2 steps
'mod2.s1.title': 'تثبيت Git على نظامك',
'mod2.s1.desc': 'حمّل وثبّت Git لنظام التشغيل الخاص بك. تختلف عملية التثبيت حسب المنصة.',
'mod2.s1.vscode': 'بعد تثبيت Git، أعد تشغيل VSCode ليكتشف تثبيت Git الجديد تلقائياً.',
'mod2.s1.tip': 'على ويندوز، أثناء التثبيت، اختر "Git from the command line and also from 3rd-party software" للتوافق الأفضل.',
'mod2.s2.title': 'التحقق من التثبيت',
'mod2.s2.desc': 'بعد التثبيت، تحقق من أن Git مثبت بشكل صحيح عن طريق فحص إصداره.',
'mod2.s3.title': 'تثبيت Visual Studio Code',
'mod2.s3.desc': 'حمّل VSCode من code.visualstudio.com. إنه محرر شيفرة مجاني ومفتوح المصدر مع دعم مدمج ممتاز لـ Git.',
'mod2.s3.tip': 'VSCode متاح لأنظمة ويندوز وماك ولينكس. اختر المثبّت المناسب لنظام تشغيلك.',
'mod2.s4.title': 'تثبيت إضافات Git في VSCode',
'mod2.s4.desc': 'عزّز تجربتك مع Git في VSCode بتثبيت هذه الإضافات الأساسية: GitLens (توفر تعليقات توضيحية غنية لـ Git blame والتاريخ وأكثر) و Git Graph (تعرض تاريخ إيداعات المستودع كرسم بياني).',
'mod2.s4.vscode': 'افتح لوحة الإضافات (Ctrl+Shift+X)، ابحث عن "GitLens" و "Git Graph"، ثم انقر تثبيت لكل منهما.',
'mod2.s5.title': 'إعداد VSCode كمحرر Git',
'mod2.s5.desc': 'عيّن VSCode كمحرر Git الافتراضي. علامة --wait تخبر Git بالانتظار حتى تغلق الملف في VSCode قبل المتابعة.',

// Module 3 steps
'mod3.s1.title': 'تعيين اسمك',
'mod3.s1.desc': 'يستخدم Git اسمك وبريدك الإلكتروني لتحديد من قام بكل إيداع. عيّن اسمك بالأمر التالي. علامة --global تطبق هذا الإعداد على جميع المستودعات على جهازك.',
'mod3.s1.tip': 'استخدم اسمك الحقيقي لأنه سيظهر في جميع إيداعاتك وسيكون مرئياً للمتعاونين.',
'mod3.s2.title': 'تعيين بريدك الإلكتروني',
'mod3.s2.desc': 'عيّن عنوان البريد الإلكتروني الذي سيرتبط بإيداعات Git الخاصة بك. استخدم نفس البريد الذي تخطط لاستخدامه مع GitHub.',
'mod3.s2.tip': 'إذا كنت تريد إبقاء بريدك خاصاً على GitHub، استخدم بريد noreply الذي يوفره GitHub في إعداداتك.',
'mod3.s3.title': 'تعيين اسم الفرع الافتراضي',
'mod3.s3.desc': 'بشكل افتراضي، ينشئ Git فرعاً يسمى "master" عند تهيئة مستودع. تحولت الصناعة لاستخدام "main" كاسم الفرع الافتراضي.',
'mod3.s3.tip': 'GitHub و GitLab و Bitbucket جميعها تستخدم "main" كافتراضي للمستودعات الجديدة.',
'mod3.s4.title': 'تعيين المحرر الافتراضي',
'mod3.s4.desc': 'قم بإعداد Git لاستخدام VSCode كمحرر افتراضي لرسائل الإيداع وعمليات rebase التفاعلية ومهام تحرير النصوص الأخرى.',
'mod3.s4.vscode': 'علامة --wait تخبر الطرفية بالتوقف حتى تغلق تبويب الملف في VSCode.',
'mod3.s5.title': 'تفعيل الإخراج الملوّن',
'mod3.s5.desc': 'فعّل الإخراج الملوّن في أوامر Git لجعل مخرجات الطرفية أسهل في القراءة. تساعد الألوان في التمييز بين أنواع المعلومات المختلفة.',
'mod3.s6.title': 'عرض جميع الإعدادات',
'mod3.s6.desc': 'راجع جميع إعدادات Git للتحقق من أن كل شيء مُعدّ بشكل صحيح.',
'mod3.s6.tip': 'تُخزّن الإعدادات في ثلاثة مستويات: النظام (/etc/gitconfig)، العام (~/.gitconfig)، والمحلي (.git/config). المحلي يتجاوز العام، والعام يتجاوز النظام.',

// Module 4 steps
'mod4.s1.title': 'إنشاء مجلد المشروع',
'mod4.s1.desc': 'ابدأ بإنشاء مجلد جديد لمشروعك وانتقل إليه.',
'mod4.s2.title': 'تهيئة مستودع Git',
'mod4.s2.desc': 'حوّل المجلد إلى مستودع Git. هذا ينشئ مجلد .git مخفي يحتوي على جميع معلومات التتبع.',
'mod4.s2.vscode': 'في VSCode، يمكنك أيضاً تهيئة مستودع بفتح لوحة التحكم بالمصدر (Ctrl+Shift+G) والنقر على "Initialize Repository".',
'mod4.s2.tip': 'تحتاج لتشغيل git init مرة واحدة فقط لكل مشروع. تشغيله مرة أخرى في مستودع موجود لن يحذف أي شيء.',
'mod4.s3.title': 'استكشاف مجلد .git',
'mod4.s3.desc': 'مجلد .git هو المكان الذي يخزن فيه Git جميع البيانات الوصفية وقاعدة بيانات الكائنات لمستودعك. لنلقِ نظرة بداخله.',
'mod4.s3.tip': 'لا تعدّل الملفات داخل .git يدوياً إلا إذا كنت تعرف بالضبط ما تفعله. تلف هذه الملفات قد يدمر تاريخ مستودعك.',
'mod4.s4.title': 'إنشاء أول ملف',
'mod4.s4.desc': 'أنشئ ملف README.md ليكون مقدمة لمشروعك.',
'mod4.s5.title': 'التحقق من حالة المستودع',
'mod4.s5.desc': 'استخدم git status لرؤية الحالة الحالية لمجلد العمل ومنطقة التهيئة. يُظهر الملفات المتتبعة والمعدّلة والمُهيأة.',
'mod4.s5.vscode': 'يعرض VSCode حالة الملفات في لوحة التحكم بالمصدر وفي مستكشف الملفات بأحرف ملونة: U (غير متتبع)، M (معدّل)، A (مُضاف).',
'mod4.s6.title': 'فهم منطقة التهيئة',
'mod4.s6.desc': 'يستخدم Git بنية من ثلاث مناطق: مجلد العمل (حيث تحرر الملفات)، منطقة التهيئة/الفهرس (حيث تُحضّر الإيداعات)، والمستودع (حيث تُخزّن الإيداعات بشكل دائم). هذا يمنحك تحكماً دقيقاً في ما يدخل كل إيداع.',
'mod4.s6.tip': 'فكّر في منطقة التهيئة كعربة تسوق. تضيف العناصر (التغييرات) إلى العربة، تراجعها، ثم تدفع (تودع) عندما تكون جاهزاً.',

// Module 5 steps
'mod5.s1.title': 'التحقق من الحالة',
'mod5.s1.desc': 'ابدأ دائماً بالتحقق من حالة مستودعك. يعرض هذا الملفات غير المتتبعة والملفات المعدّلة والتغييرات المُهيأة.',
'mod5.s2.title': 'تهيئة ملف واحد',
'mod5.s2.desc': 'أضف ملفاً محدداً إلى منطقة التهيئة. هذا يخبر Git أنك تريد تضمين هذا الملف في إيداعك التالي.',
'mod5.s2.vscode': 'في VSCode، انقر على أيقونة + بجانب ملف في لوحة التحكم بالمصدر لتهيئته.',
'mod5.s3.title': 'تهيئة ملفات متعددة',
'mod5.s3.desc': 'يمكنك تهيئة عدة ملفات دفعة واحدة بإدراجها، أو استخدم "git add ." لتهيئة جميع التغييرات في المجلد الحالي.',
'mod5.s3.tip': 'استخدم "git add ." بحذر — إنه يهيئ كل شيء. تأكد من أنك لا تهيئ ملفات لا تريد إيداعها بالخطأ.',
'mod5.s3.warning': 'كن حذراً مع "git add ." — سيُهيئ جميع التغييرات بما فيها ملفات قد لا ترغب بإيداعها. شغّل git status أولاً دائماً.',
'mod5.s4.title': 'التحقق من الحالة بعد التهيئة',
'mod5.s4.desc': 'بعد التهيئة، شغّل git status مرة أخرى. تظهر الملفات المُهيأة باللون الأخضر تحت "Changes to be committed".',
'mod5.s5.title': 'إنشاء أول إيداع',
'mod5.s5.desc': 'الإيداع ينشئ لقطة من جميع التغييرات المُهيأة. علامة -m تتيح لك كتابة رسالة الإيداع مباشرة.',
'mod5.s5.vscode': 'في VSCode، اكتب رسالة الإيداع في مربع النص أعلى لوحة التحكم بالمصدر وانقر علامة الصح (أو اضغط Ctrl+Enter) للإيداع.',
'mod5.s5.tip': 'اكتب رسائل إيداع ذات معنى. صيغة جيدة: "Add user authentication feature" — ابدأ بفعل، وكن محدداً.',
'mod5.s6.title': 'عرض سجل الإيداعات',
'mod5.s6.desc': 'اعرض سجل جميع الإيداعات. علامة --oneline تعرض عرضاً مختصراً بالتجزئة والرسالة فقط.',
'mod5.s7.title': 'إجراء تغييرات وإيداع مرة أخرى',
'mod5.s7.desc': 'عدّل ملفاً موجوداً، هيّئ التغييرات، وأنشئ إيداعاً جديداً. هذا هو سير عمل Git الأساسي الذي ستكرره باستمرار.',
'mod5.s8.title': 'عرض الفروقات',
'mod5.s8.desc': 'استخدم git diff لرؤية ما تغير بالضبط في ملفاتك. بدون علامات، يعرض التغييرات غير المُهيأة. استخدم --staged لرؤية التغييرات المُهيأة.',
'mod5.s8.vscode': 'يعرض VSCode الفروقات مباشرة في المحرر. انقر على ملف معدّل في التحكم بالمصدر لرؤية عرض فروقات جنباً إلى جنب.',

// Module 6 steps
'mod6.s1.title': 'سجل Git الكامل',
'mod6.s1.desc': 'الأمر git log الافتراضي يعرض معلومات تفصيلية لكل إيداع: التجزئة، المؤلف، التاريخ، والرسالة.',
'mod6.s2.title': 'سجل مختصر',
'mod6.s2.desc': 'استخدم العلامات لإنشاء تمثيل مختصر ومرئي لتاريخ إيداعاتك مع رسم بياني للفروع.',
'mod6.s2.tip': 'أنشئ اختصاراً لهذا: git config --global alias.lg "log --oneline --graph --all"',
'mod6.s3.title': 'تنسيق سجل مخصص',
'mod6.s3.desc': 'يدعم سجل Git التنسيق المخصص مع حوامل: %h (تجزئة قصيرة)، %an (اسم المؤلف)، %ar (تاريخ نسبي)، %s (الموضوع).',
'mod6.s4.title': 'عرض إيداع محدد',
'mod6.s4.desc': 'استخدم git show لرؤية التفاصيل الكاملة لإيداع محدد، بما في ذلك فروقات التغييرات التي أُجريت.',
'mod6.s5.title': 'مقارنة التغييرات',
'mod6.s5.desc': 'استخدم git diff لمقارنة التغييرات. بدون معاملات يعرض التغييرات غير المُهيأة. استخدم --staged (أو --cached) لرؤية التغييرات المُهيأة الجاهزة للإيداع.',
'mod6.s5.vscode': 'في VSCode، تعرض لوحة Git التغييرات مباشرة. يمكنك أيضاً استخدام أمر "Compare with Previous" من لوحة الأوامر.',
'mod6.s6.title': 'تتبع أصل الملف (Blame)',
'mod6.s6.desc': 'Git blame يُظهر من عدّل آخر مرة كل سطر في ملف وفي أي إيداع. هذا لا يُقدّر بثمن لفهم تاريخ الشيفرة.',
'mod6.s6.vscode': 'إضافة GitLens تضيف تعليقات blame مباشرة في المحرر، تُظهر من غيّر كل سطر ومتى.',

// Module 7 steps
'mod7.s1.title': 'ما هي الفروع؟',
'mod7.s1.desc': 'الفرع في Git هو ببساطة مؤشر خفيف إلى إيداع. الفروع تتيح لك الانحراف عن خط التطوير الرئيسي للعمل على ميزات أو إصلاحات أو تجارب بشكل مستقل. الفرع الافتراضي يُسمى عادة "main".',
'mod7.s2.title': 'عرض الفروع',
'mod7.s2.desc': 'اعرض جميع الفروع المحلية في مستودعك. الفرع الحالي يُميّز بنجمة (*).',
'mod7.s3.title': 'إنشاء فرع جديد',
'mod7.s3.desc': 'أنشئ فرعاً جديداً يشير إلى الإيداع الحالي. هذا لا يبدّل إلى الفرع الجديد — تبقى على فرعك الحالي.',
'mod7.s4.title': 'التبديل إلى فرع',
'mod7.s4.desc': 'بدّل مجلد عملك إلى الفرع المحدد. يحدّث Git ملفاتك لتتطابق مع رأس الفرع. الأمر الحديث هو "git switch"، وكذلك "git checkout" يعمل.',
'mod7.s4.tip': 'أمر "git switch" قُدّم في Git 2.23 كبديل أوضح لـ "git checkout" لتبديل الفروع.',
'mod7.s5.title': 'إنشاء والتبديل بأمر واحد',
'mod7.s5.desc': 'استخدم علامة -c مع git switch (أو -b مع git checkout) لإنشاء فرع جديد والتبديل إليه بأمر واحد.',
'mod7.s6.title': 'العمل على فرع',
'mod7.s6.desc': 'بمجرد أن تكون على فرع الميزة، أجرِ تغييراتك، هيّئها، وأودعها. هذه الإيداعات موجودة فقط على هذا الفرع حتى تدمجها.',
'mod7.s6.vscode': 'اسم الفرع الحالي يظهر في الزاوية السفلية اليسرى من VSCode. انقر عليه لتبديل الفروع أو إنشاء فروع جديدة.',
'mod7.s7.title': 'حذف فرع',
'mod7.s7.desc': 'بعد دمج فرع، احذفه للحفاظ على نظافة مستودعك. استخدم -d للحذف الآمن (يعمل فقط إذا تم الدمج) أو -D للحذف القسري.',
'mod7.s7.warning': 'استخدام -D (حرف كبير) يحذف الفرع قسرياً حتى لو كان يحتوي على تغييرات غير مدمجة. استخدم -d (حرف صغير) للأمان.',

// Module 8 steps
'mod8.s1.title': 'ما هو الدمج؟',
'mod8.s1.desc': 'الدمج يدمج التغييرات من فرع إلى آخر. يدعم Git نوعين رئيسيين: الدمج السريع (عندما لا يحتوي الفرع المستهدف على إيداعات جديدة) والدمج الثلاثي (عندما تفرّع كلا الفرعين).',
'mod8.s2.title': 'التبديل إلى الفرع المستهدف',
'mod8.s2.desc': 'قبل الدمج، بدّل إلى الفرع الذي تريد الدمج فيه (عادة main).',
'mod8.s3.title': 'دمج فرع',
'mod8.s3.desc': 'ادمج فرع الميزة في فرعك الحالي. سيحدد Git تلقائياً أفضل استراتيجية دمج.',
'mod8.s3.vscode': 'في VSCode، استخدم لوحة الأوامر (Ctrl+Shift+P) وابحث عن "Git: Merge Branch" للدمج بصرياً.',
'mod8.s4.title': 'الدمج السريع',
'mod8.s4.desc': 'يحدث الدمج السريع عندما لا يحتوي الفرع المستهدف على إيداعات جديدة منذ إنشاء فرع الميزة. يقوم Git ببساطة بتحريك مؤشر الفرع للأمام — لا يُنشأ إيداع دمج.',
'mod8.s5.title': 'الدمج الثلاثي',
'mod8.s5.desc': 'يحدث الدمج الثلاثي عندما يتفرّع كلا الفرعين (كلاهما لديه إيداعات جديدة). ينشئ Git إيداع دمج جديد له والدان، يجمع التغييرات من كلا الفرعين.',
'mod8.s6.title': 'عرض سجل الدمج',
'mod8.s6.desc': 'تصور سجل الدمج بالرسم البياني. علامة --graph تعرض اتصالات الفروع والدمج.',
'mod8.s7.title': 'حذف الفرع المدمج',
'mod8.s7.desc': 'بعد دمج ناجح، لم يعد فرع الميزة مطلوباً. احذفه للحفاظ على قائمة فروعك نظيفة.',

// Module 9 steps
'mod9.s1.title': 'ما هي المستودعات البعيدة؟',
'mod9.s1.desc': 'المستودع البعيد هو نسخة من مشروعك مستضافة على الإنترنت أو شبكة. يتيح التعاون: يمكن لعدة مطورين دفع وسحب التغييرات. GitHub و GitLab و Bitbucket هي خدمات استضافة شائعة.',
'mod9.s2.title': 'إنشاء مستودع GitHub',
'mod9.s2.desc': 'اذهب إلى github.com، انقر "New repository"، أعطه اسماً، اختر عام أو خاص، وانقر "Create repository". لا تقم بتهيئة README إذا كان لديك مستودع محلي بالفعل.',
'mod9.s2.tip': 'إذا كان لديك مستودع محلي بإيداعات بالفعل، لا تضف README أو .gitignore أو ترخيص على GitHub — سينشئ ذلك تعارضات.',
'mod9.s3.title': 'إضافة الأصل البعيد',
'mod9.s3.desc': 'اربط مستودعك المحلي بالمستودع البعيد على GitHub. "origin" هو الاسم التقليدي للمصدر البعيد الرئيسي.',
'mod9.s4.title': 'التحقق من البعيد',
'mod9.s4.desc': 'تحقق من أن المصدر البعيد أُضيف بشكل صحيح. علامة -v تعرض عناوين URL للجلب والدفع.',
'mod9.s5.title': 'الدفع إلى البعيد',
'mod9.s5.desc': 'ارفع إيداعاتك المحلية إلى المستودع البعيد. علامة -u تنشئ تتبع ليحتاج الدفع مستقبلاً "git push" فقط.',
'mod9.s5.tip': 'علامة -u (أو --set-upstream) تنشئ علاقة تتبع. بعدها، يمكنك ببساطة استخدام "git push" و "git pull".',
'mod9.s6.title': 'إعداد مفتاح SSH',
'mod9.s6.desc': 'مفاتيح SSH توفر طريقة آمنة للمصادقة مع GitHub بدون إدخال كلمة المرور كل مرة. أنشئ زوج مفاتيح SSH.',
'mod9.s6.tip': 'خوارزمية Ed25519 هي الموصى بها. عند السؤال، اضغط Enter لقبول موقع الملف الافتراضي واختيارياً عيّن عبارة مرور.',
'mod9.s7.title': 'إضافة مفتاح SSH إلى GitHub',
'mod9.s7.desc': 'انسخ مفتاحك العام وأضفه إلى حساب GitHub. اذهب إلى إعدادات GitHub > SSH and GPG Keys > New SSH Key، الصق المفتاح واحفظ.',
'mod9.s8.title': 'نسخ مستودع',
'mod9.s8.desc': 'النسخ ينشئ نسخة كاملة من مستودع بعيد على جهازك المحلي، بما في ذلك جميع التاريخ والفروع.',
'mod9.s8.vscode': 'في VSCode، اضغط Ctrl+Shift+P، اكتب "Git: Clone"، الصق رابط المستودع، واختر مجلداً محلياً.',

// Module 10 steps
'mod10.s1.title': 'نسخ مستودع',
'mod10.s1.desc': 'ابدأ بنسخ مستودع موجود للعمل عليه. هذا ينشئ نسخة محلية مع تاريخ الإيداعات الكامل وينشئ تتبع المصدر البعيد تلقائياً.',
'mod10.s2.title': 'جلب التغييرات البعيدة',
'mod10.s2.desc': 'الجلب يحمّل بيانات جديدة من المستودع البعيد لكنه لا يعدّل مجلد عملك. يحدّث فروع التتبع البعيدة فقط.',
'mod10.s3.title': 'سحب التغييرات البعيدة',
'mod10.s3.desc': 'السحب هو مزيج من الجلب + الدمج. يحمّل التغييرات البعيدة ويدمجها فوراً في فرعك الحالي.',
'mod10.s3.warning': 'إذا كان لديك تغييرات محلية غير مودعة، قد يفشل السحب أو ينشئ تعارضات. أودع أو خبّئ تغييراتك أولاً.',
'mod10.s4.title': 'الفرق بين الجلب والسحب',
'mod10.s4.desc': 'الجلب أكثر أماناً — يحمّل التغييرات بدون تعديل عملك. يمكنك المراجعة بـ "git diff main origin/main" قبل الدمج. السحب مريح لكن قد يفاجئك بتعارضات.',
'mod10.s5.title': 'دفع تغييراتك',
'mod10.s5.desc': 'ارفع إيداعاتك المحلية إلى المستودع البعيد. يمكن للآخرين بعدها سحب تغييراتك.',
'mod10.s6.title': 'تتبع الفروع البعيدة',
'mod10.s6.desc': 'اعرض الفروع البعيدة بـ git branch -r. أعدّ التتبع بـ --set-upstream-to لربط فرعك المحلي بفرع بعيد.',
'mod10.s7.title': 'طلبات السحب',
'mod10.s7.desc': 'طلبات السحب (PRs) هي ميزة في GitHub لاقتراح التغييرات. تدفع فرعاً، تفتح PR، تطلب مراجعات، تناقش، وتدمج عند الموافقة. إنها أساسية لتعاون الفريق.',
'mod10.s7.vscode': 'ثبّت إضافة "GitHub Pull Requests and Issues" في VSCode لإنشاء ومراجعة PRs مباشرة في محررك.',

// Module 11 steps
'mod11.s1.title': 'ما الذي يسبب التعارضات؟',
'mod11.s1.desc': 'تحدث تعارضات الدمج عندما يعدّل فرعان نفس الأسطر في نفس الملف، أو عندما يحذف فرع ملفاً عدّله الفرع الآخر. لا يستطيع Git تحديد التغيير الذي يجب الاحتفاظ به تلقائياً.',
'mod11.s2.title': 'إنشاء سيناريو تعارض',
'mod11.s2.desc': 'لنُنشئ تعارضاً عن قصد. أنشئ فرعين يعدّلان نفس السطر في نفس الملف، ثم حاول دمجهما.',
'mod11.s3.title': 'تحديد علامات التعارض',
'mod11.s3.desc': 'عند حدوث تعارض، يميّز Git المناطق المتعارضة في الملف بعلامات خاصة: <<<<<<< HEAD يعرض تغييرات فرعك الحالي، ======= يفصل بين النسختين، و >>>>>>> branch-name يعرض التغييرات الواردة.',
'mod11.s4.title': 'الحل اليدوي',
'mod11.s4.desc': 'حرر الملف لإزالة علامات التعارض والاحتفاظ بالمحتوى المطلوب. أنت تقرر كيف يجب أن تبدو النسخة النهائية — يمكنك الاحتفاظ بجانب أو الآخر أو دمج الاثنين.',
'mod11.s5.title': 'الحل في VSCode',
'mod11.s5.desc': 'يوفر VSCode محرر دمج مرئي مع خيارات "Accept Current Change" و "Accept Incoming Change" و "Accept Both Changes" أو "Compare Changes". هذا يجعل حل التعارضات أسهل بكثير.',
'mod11.s5.vscode': 'يميّز VSCode التعارضات بخلفيات ملونة ويوفر أزراراً قابلة للنقر فوق كل تعارض لاختيار الحل بسرعة.',
'mod11.s6.title': 'إكمال الدمج',
'mod11.s6.desc': 'بعد حل جميع التعارضات، هيّئ الملفات المحلولة بـ git add وأكمل الدمج بـ git commit.',
'mod11.s7.title': 'إلغاء الدمج',
'mod11.s7.desc': 'إذا أردت إلغاء الدمج والعودة إلى الحالة قبل بدء الدمج، استخدم git merge --abort.',
'mod11.s7.tip': 'إلغاء الدمج آمن — يستعيد مجلد عملك والفهرس إلى حالة ما قبل الدمج.',

// Module 12 steps
'mod12.s1.title': 'ما هو إعادة القاعدة (Rebase)؟',
'mod12.s1.desc': 'إعادة القاعدة تعيد تطبيق إيداعاتك فوق رأس فرع آخر. بدلاً من إنشاء إيداع دمج، تعيد كتابة التاريخ لإنشاء تسلسل خطي من الإيداعات.',
'mod12.s2.title': 'إعادة القاعدة الأساسية',
'mod12.s2.desc': 'أثناء وجودك على فرع الميزة، أعد القاعدة على main لدمج أحدث التغييرات. هذا ينقل إيداعات فرع الميزة إلى رأس main.',
'mod12.s3.title': 'إعادة القاعدة مقابل الدمج',
'mod12.s3.desc': 'الدمج يحافظ على التاريخ كما حدث بالضبط (مع إيداعات الدمج). إعادة القاعدة تنشئ تاريخاً أنظف وخطي لكنها تعيد كتابة تجزئات الإيداعات. استخدم الدمج للفروع المشتركة وإعادة القاعدة للتنظيف المحلي.',
'mod12.s4.title': 'إعادة القاعدة التفاعلية',
'mod12.s4.desc': 'إعادة القاعدة التفاعلية تتيح لك تحرير وإعادة ترتيب ودمج أو حذف الإيداعات. علامة -i تفتح محرراً حيث تتحكم في كل إيداع.',
'mod12.s4.vscode': 'يعمل VSCode كمحرر لإعادة القاعدة التفاعلية عند إعداده كمحرر Git. سترى قائمة إيداعات مع إجراءات.',
'mod12.s5.title': 'دمج الإيداعات (Squash)',
'mod12.s5.desc': 'الدمج يجمع عدة إيداعات في واحد. في إعادة القاعدة التفاعلية، غيّر "pick" إلى "squash" (أو "s") للإيداعات التي تريد دمجها مع الإيداع السابق.',
'mod12.s5.tip': 'ادمج إيداعات العمل قيد التنفيذ قبل دمج فرع الميزة للحفاظ على تاريخ الفرع الرئيسي نظيفاً وقابلاً للقراءة.',
'mod12.s6.title': 'القاعدة الذهبية لإعادة القاعدة',
'mod12.s6.desc': 'لا تعد قاعدة إيداعات تم دفعها إلى فرع مشترك/عام أبداً. إعادة القاعدة تعيد كتابة تاريخ الإيداعات، مما قد يسبب مشاكل خطيرة للمطورين الآخرين الذين بنوا عملهم على تلك الإيداعات.',
'mod12.s6.warning': 'لا تعد قاعدة إيداعات موجودة على فرع بعيد يستخدمه آخرون أبداً. هذا يعيد كتابة التاريخ وسيسبب تعارضات للجميع.',
'mod12.s7.title': 'إلغاء إعادة القاعدة',
'mod12.s7.desc': 'إذا سارت إعادة القاعدة بشكل خاطئ أو واجهت تعارضات لا تريد حلها، ألغِ وعُد إلى حالة ما قبل إعادة القاعدة.',

// Module 13 steps
'mod13.s1.title': 'ما هو التخزين المؤقت (Stash)؟',
'mod13.s1.desc': 'التخزين المؤقت يحفظ تغييراتك غير المودعة مؤقتاً (المُهيأة وغير المُهيأة) حتى تتمكن من تبديل الفروع أو سحب التحديثات بدون فقدان العمل. فكّر فيه كحافظة لتغييراتك.',
'mod13.s2.title': 'حفظ التغييرات في التخزين المؤقت',
'mod13.s2.desc': 'خبّئ تغييراتك الحالية. استخدم -m لإضافة رسالة وصفية لسهولة التعرف لاحقاً.',
'mod13.s3.title': 'عرض التخزينات المؤقتة',
'mod13.s3.desc': 'اعرض جميع التخزينات المحفوظة. كل تخزين له فهرس (stash@{0} هو الأحدث) ويعرض الفرع والرسالة.',
'mod13.s4.title': 'تطبيق التخزين المؤقت',
'mod13.s4.desc': 'استعد التغييرات المخبأة. "git stash pop" يطبق ويزيل التخزين. "git stash apply" يطبق لكن يبقي التخزين للاستخدام لاحقاً.',
'mod13.s4.tip': 'استخدم "pop" عندما تنتهي من التخزين. استخدم "apply" إذا كنت قد تحتاج لتطبيق نفس التخزين على عدة فروع.',
'mod13.s5.title': 'حذف تخزين مؤقت',
'mod13.s5.desc': 'أزل تخزيناً محدداً من قائمة التخزينات بدون تطبيقه.',
'mod13.s6.title': 'ما هو اختيار الإيداع (Cherry-Pick)؟',
'mod13.s6.desc': 'اختيار الإيداع يتيح لك تطبيق إيداع محدد من فرع على آخر. بخلاف الدمج (الذي يجلب جميع الإيداعات)، يختار cherry-pick إيداعات فردية.',
'mod13.s7.title': 'اختيار إيداع محدد',
'mod13.s7.desc': 'طبّق إيداعاً محدداً على فرعك الحالي بتوفير تجزئته. يُعاد تطبيق الإيداع كإيداع جديد بتجزئة جديدة.',
'mod13.s7.tip': 'Cherry-pick مفيد لتطبيق إصلاحات عاجلة من فرع الإصدار إلى main، أو لجلب ميزات محددة بين الفروع.',

// Module 14 steps
'mod14.s1.title': 'تجاهل تغييرات العمل',
'mod14.s1.desc': 'تخلص من التغييرات في مجلد عملك التي لم تُهيأ بعد. هذا يستعيد الملف إلى آخر نسخة مودعة.',
'mod14.s1.warning': 'هذا يتخلص من تغييراتك نهائياً. لا يوجد تراجع للعمل غير المُهيأ الذي لم يُودع.',
'mod14.s2.title': 'إلغاء التهيئة',
'mod14.s2.desc': 'أزل ملفاً من منطقة التهيئة بدون التخلص من التغييرات. يعود الملف إلى حالة "معدّل" في مجلد العمل.',
'mod14.s3.title': 'إعادة التعيين الناعمة',
'mod14.s3.desc': 'حرّك مؤشر الفرع إلى الوراء إيداعاً واحداً لكن أبقِ جميع التغييرات مُهيأة. مفيد لإعادة كتابة رسالة الإيداع أو الدمج مع تغييرات أخرى.',
'mod14.s3.tip': 'إعادة التعيين الناعمة هي الأكثر أماناً — تحرّك HEAD فقط. جميع تغييراتك تبقى مُهيأة وجاهزة للإيداع.',
'mod14.s4.title': 'إعادة التعيين المختلطة (الافتراضية)',
'mod14.s4.desc': 'حرّك مؤشر الفرع إلى الوراء وألغِ تهيئة التغييرات، لكن أبقها في مجلد العمل. هذا هو السلوك الافتراضي لـ git reset.',
'mod14.s5.title': 'إعادة التعيين الصلبة',
'mod14.s5.desc': 'حرّك مؤشر الفرع إلى الوراء وتخلص من جميع التغييرات في منطقة التهيئة ومجلد العمل. هذا مدمّر ولا يمكن التراجع عنه بسهولة.',
'mod14.s5.warning': 'إعادة التعيين الصلبة تدمر جميع التغييرات غير المودعة وتزيل الإيداعات نهائياً. استخدمها فقط عندما تكون متأكداً تماماً.',
'mod14.s6.title': 'عكس إيداع',
'mod14.s6.desc': 'أنشئ إيداعاً جديداً يلغي تغييرات إيداع سابق. بخلاف reset، الـ revert آمن للفروع المشتركة لأنه لا يعيد كتابة التاريخ.',
'mod14.s6.tip': 'استخدم revert بدلاً من reset على الفروع المشتركة. Revert يضيف إيداعاً جديداً بدلاً من إزالة القديم.',
'mod14.s7.title': 'Reset مقابل Revert',
'mod14.s7.desc': 'Reset يعيد كتابة التاريخ (يحرّك مؤشر الفرع للخلف) — خطر على الفروع المشتركة. Revert ينشئ إيداعاً جديداً يلغي التغييرات — آمن للفروع المشتركة. استخدم reset للتنظيف المحلي و revert للتاريخ العام.',
'mod14.s8.title': 'Reflog — استرجاع الإيداعات المفقودة',
'mod14.s8.desc': 'الـ reflog يسجل كل تغيير على HEAD، حتى تلك "المفقودة" بسبب reset. إذا أعدت التعيين بعيداً بالخطأ، استخدم reflog للعثور على تجزئة الإيداع واستعادته.',
'mod14.s8.tip': 'Reflog هو شبكة أمانك. حتى بعد إعادة تعيين صلبة، يمكنك استرجاع الإيداعات خلال حوالي 90 يوماً باستخدام reflog.',

// Module 15 steps
'mod15.s1.title': 'إنشاء .gitignore',
'mod15.s1.desc': 'ملف .gitignore يخبر Git أي الملفات والمجلدات يجب تجاهلها. الإدخالات الشائعة تشمل: node_modules/ و .env و *.log و .DS_Store و dist/ ومجلدات IDE المحددة.',
'mod15.s1.tip': 'زر gitignore.io (أو github.com/github/gitignore) لقوالب جاهزة للغة البرمجة أو الإطار الخاص بك.',
'mod15.s2.title': '.gitignore العام',
'mod15.s2.desc': 'أعدّ .gitignore عام للملفات التي تريد تجاهلها دائماً في جميع المستودعات (مثل ملفات نظام التشغيل .DS_Store و Thumbs.db).',
'mod15.s3.title': 'العلامات الخفيفة',
'mod15.s3.desc': 'العلامات الخفيفة هي مؤشرات بسيطة إلى إيداع. إنها مثل الإشارات المرجعية — مجرد اسم يشير إلى إيداع محدد.',
'mod15.s4.title': 'العلامات المشروحة',
'mod15.s4.desc': 'العلامات المشروحة تخزن بيانات وصفية إضافية: اسم الواضع وبريده وتاريخه ورسالة. يُنصح بها للإصدارات.',
'mod15.s4.tip': 'استخدم العلامات المشروحة للإصدارات (v1.0, v2.0) والعلامات الخفيفة للعلامات المؤقتة أو الداخلية.',
'mod15.s5.title': 'دفع العلامات إلى البعيد',
'mod15.s5.desc': 'العلامات لا تُدفع افتراضياً مع git push. استخدم --tags لدفع جميع العلامات، أو ادفع علامة محددة بالاسم.',
'mod15.s6.title': 'إصدارات GitHub',
'mod15.s6.desc': 'إصدارات GitHub تُبنى فوق العلامات. اذهب إلى مستودعك > Releases > "Create a new release"، اختر علامة، أضف ملاحظات الإصدار واختيارياً أرفق ملفات ثنائية.',
'mod15.s6.vscode': 'إضافة GitHub Pull Requests تتيح لك تصفح الإصدارات، لكن إنشاءها يُفضّل من واجهة GitHub على الويب.',

// Module 16 steps
'mod16.s1.title': 'سير عمل GitFlow',
'mod16.s1.desc': 'GitFlow يستخدم فرعين دائمين: main (شيفرة جاهزة للإنتاج) و develop (فرع التكامل). فروع الميزات تتفرع من develop، فروع الإصدار تُحضّر للإنتاج، وفروع الإصلاح العاجل تصلح أخطاء الإنتاج الطارئة.',
'mod16.s2.title': 'سير عمل GitHub Flow',
'mod16.s2.desc': 'GitHub Flow أبسط: فقط الفرع الرئيسي دائم. أنشئ فروع ميزات من main، افتح طلبات سحب، احصل على مراجعات، وادمج. النشر يحدث من main بعد الدمج.',
'mod16.s3.title': 'التطوير القائم على الجذع',
'mod16.s3.desc': 'جميع المطورين يودعون في فرع "جذع" واحد (main). فروع الميزات قصيرة العمر جداً (ساعات، ليس أيام). أعلام الميزات تتحكم بالعمل غير المكتمل في الإنتاج. التركيز على CI/CD.',
'mod16.s4.title': 'اتفاقيات رسائل الإيداع',
'mod16.s4.desc': 'صيغة الإيداعات التقليدية: type(scope): description. الأنواع تشمل: feat (ميزة جديدة)، fix (إصلاح خطأ)، docs (توثيق)، style (تنسيق)، refactor، test، chore (صيانة). مثال: "feat(auth): add OAuth2 login"',
'mod16.s4.tip': 'رسائل الإيداع الجيدة تشرح لماذا، ليس فقط ماذا. فروقات الشيفرة تُظهر ما تغيّر؛ الرسالة يجب أن تشرح المنطق.',
'mod16.s5.title': 'قواعد حماية الفروع',
'mod16.s5.desc': 'على GitHub، احمِ الفروع المهمة: اطلب مراجعات طلبات السحب، اطلب نجاح فحوصات الحالة (CI)، اطلب تحديث الفروع، وقيّد من يمكنه الدفع مباشرة.',
'mod16.s5.vscode': 'عند تفعيل حماية الفرع، سترى أخطاء إذا حاولت الدفع مباشرة إلى فرع محمي من VSCode.',
'mod16.s6.title': 'أفضل ممارسات مراجعة الشيفرة',
'mod16.s6.desc': 'مراجعات شيفرة فعّالة: أبقِ PRs صغيرة ومركّزة، اكتب أوصاف PR واضحة، راجع المنطق والتصميم (ليس فقط الأسلوب)، كن بنّاءً في التعليقات، استخدم الفحص الآلي والاختبارات، وافق أو اطلب تغييرات بسرعة.',

// Module 17 — HEAD والمراجع النسبية
'mod17.title': 'HEAD والمراجع النسبية',
'mod17.desc': 'افهم ما هو HEAD، تنقّل في تاريخ الإيداعات باستخدام المراجع النسبية (^ و ~)، وتعلّم تحريك مؤشرات الفروع.',
'mod17.s1.title': 'فهم HEAD',
'mod17.s1.desc': 'HEAD هو مؤشر إلى الإيداع الحالي الذي تعمل عليه. عادةً يشير إلى اسم فرع (مثل main)، والذي بدوره يشير إلى إيداع. فكّر في HEAD على أنه "أين أنا الآن؟" في تاريخ Git.',
'mod17.s2.title': 'حالة HEAD المنفصل',
'mod17.s2.desc': 'عندما تنتقل إلى إيداع محدد بدلاً من فرع، يشير HEAD مباشرة إلى ذلك الإيداع — وهذا يسمى "HEAD منفصل." يمكنك تصفح الكود وإجراء تغييرات تجريبية، لكن أي إيداعات لن تنتمي لأي فرع ما لم تنشئ واحداً.',
'mod17.s2.tip': 'إذا وجدت نفسك في HEAD منفصل بالخطأ، نفّذ "git switch -" أو "git switch main" للعودة.',
'mod17.s3.title': 'المراجع النسبية مع (^)',
'mod17.s3.desc': 'علامة (^) تنقلك أباً واحداً لأعلى في شجرة الإيداعات. HEAD^ تعني "أب HEAD." في إيداعات الدمج، ^1 هو الأب الأول (الفرع الذي دُمج فيه) و ^2 هو الأب الثاني (الفرع الذي تم دمجه).',
'mod17.s4.title': 'المراجع النسبية مع (~)',
'mod17.s4.desc': 'علامة (~) متبوعة برقم تنقلك ذلك العدد من الأجيال للخلف. HEAD~3 تعني "ارجع 3 إيداعات من HEAD." تتبع دائماً الأب الأول، مما يجعلها مثالية للتنقل الخطي.',
'mod17.s5.title': 'تحريك الفروع إجبارياً',
'mod17.s5.desc': 'استخدم "git branch -f <branch> <target>" لنقل مؤشر فرع إلى أي إيداع. مثلاً "git branch -f main HEAD~3" ينقل main للخلف 3 إيداعات. هذا قوي لكن خطير — لا تفعله على الفروع المشتركة.',
'mod17.s5.warning': 'تحريك مؤشرات الفروع بـ -f قد يسبب فقدان البيانات. تأكد دائماً من معرفة أين سينتهي الفرع.',
'mod17.s6.title': 'التنقل العملي',
'mod17.s6.desc': 'استخدم "git log --oneline --graph --all" لتصور تاريخك، ثم استخدم المراجع النسبية للتنقل. ادمجها مع "git show HEAD~2" لفحص إيداعات محددة دون مغادرة فرعك الحالي.',
// Module 18
'mod18.title': 'إتقان إعادة التأسيس التفاعلي',
'mod18.desc': 'أتقن إعادة التأسيس التفاعلي لإعادة ترتيب ودمج وتعديل وحذف الإيداعات للحصول على تاريخ إيداعات نظيف واحترافي.',
'mod18.s1.title': 'ما هو إعادة التأسيس التفاعلي',
'mod18.s1.desc': 'إعادة التأسيس التفاعلي (git rebase -i) يفتح محرراً يعرض الإيداعات الأخيرة مع إجراءات: pick (إبقاء)، reword (تغيير الرسالة)، squash (دمج مع السابق)، edit (توقف للتعديل)، و drop (حذف).',
'mod18.s2.title': 'إعادة ترتيب الإيداعات',
'mod18.s2.desc': 'في محرر إعادة التأسيس التفاعلي، يمكنك إعادة ترتيب السطور لإعادة ترتيب الإيداعات. هذا مفيد لتجميع التغييرات المرتبطة معاً.',
'mod18.s3.title': 'دمج الإيداعات (Squash)',
'mod18.s3.desc': 'غيّر "pick" إلى "squash" لدمج إيداع مع الذي فوقه. مثالي لتنظيف إيداعات "WIP" أو "إصلاح خطأ مطبعي" في إيداع واحد ذي معنى.',
'mod18.s4.title': 'تعديل إيداعات سابقة',
'mod18.s4.desc': 'استخدم "edit" لإيقاف إعادة التأسيس عند إيداع محدد. يتوقف Git ويسمح لك بتعديل ذلك الإيداع بـ "git commit --amend". ثم أكمل بـ "git rebase --continue".',
'mod18.s5.title': 'تقسيم إيداع',
'mod18.s5.desc': 'لتقسيم إيداع، ضع علامة "edit" عليه. عندما يتوقف Git، نفّذ "git reset HEAD^" لإلغاء التجهيز، ثم أنشئ عدة إيداعات أصغر. أخيراً نفّذ "git rebase --continue".',
'mod18.s6.title': 'القاعدة الذهبية لإعادة التأسيس',
'mod18.s6.desc': 'لا تعيد تأسيس إيداعات تم دفعها إلى فرع مشترك/عام. إعادة التأسيس تعيد كتابة هاشات الإيداعات، مما يسبب مشاكل لأي شخص بنى عمله على تلك الإيداعات.',
'mod18.s6.warning': 'إعادة تأسيس الإيداعات العامة يجبر الجميع على إعادة مزامنة عملهم.',
'mod18.s7.title': 'إعادة التأسيس مقابل الدمج',
'mod18.s7.desc': 'الدمج يحافظ على التاريخ الدقيق بينما إعادة التأسيس تنشئ تاريخاً خطياً. استخدم إعادة التأسيس لفروع الميزات قبل الدمج. استخدم الدمج للفروع طويلة الأمد.',
// Module 19
'mod19.title': 'خطافات Git والأتمتة',
'mod19.desc': 'أتمت سير عملك مع خطافات Git. شغّل أدوات الفحص والاختبارات والتنسيق تلقائياً عند الإيداع والدفع.',
'mod19.s1.title': 'ما هي خطافات Git',
'mod19.s1.desc': 'خطافات Git هي سكريبتات تعمل تلقائياً عند حدوث أحداث Git معينة. توجد في .git/hooks/ ويمكن أن تكون من جانب العميل (pre-commit, commit-msg, pre-push) أو الخادم.',
'mod19.s2.title': 'خطاف Pre-commit',
'mod19.s2.desc': 'خطاف pre-commit يعمل قبل كل إيداع. استخدمه لتشغيل أدوات الفحص والتنسيق. إذا خرج السكريبت بحالة غير صفرية، يُلغى الإيداع.',
'mod19.s3.title': 'خطاف Commit-msg',
'mod19.s3.desc': 'خطاف commit-msg يعمل بعد كتابة رسالة الإيداع. استخدمه لفرض اتفاقيات رسائل الإيداع مثل Conventional Commits.',
'mod19.s4.title': 'خطاف Pre-push',
'mod19.s4.desc': 'خطاف pre-push يعمل قبل إرسال git push البيانات. استخدمه لتشغيل اختباراتك — إذا فشلت، يُلغى الدفع.',
'mod19.s5.title': 'إعداد Husky',
'mod19.s5.desc': 'Husky هي حزمة npm تسهّل إدارة خطافات Git ومشاركتها مع الفريق. نفّذ "npx husky init" لإعدادها. الخطافات تُخزن في مجلد .husky/ الذي يُضاف للمستودع.',
'mod19.s6.title': 'lint-staged',
'mod19.s6.desc': 'lint-staged تشغّل أدوات الفحص فقط على الملفات المُجهّزة للإيداع (ليس كل الشيفرة). مدمجة مع Husky، تجعل خطافات pre-commit سريعة.',
// Module 20
'mod20.title': 'عمليات البعد المتقدمة',
'mod20.desc': 'أتقن سير العمل البعيد المتقدم: مواصفات المراجع، تتبع المنبع، الدفع الإجباري الآمن، التعامل مع التواريخ المتباعدة، وإدارة عدة مستودعات بعيدة.',
'mod20.s1.title': 'فروع التتبع البعيد',
'mod20.s1.desc': 'فروع التتبع البعيد (مثل origin/main) هي مراجع محلية لحالة الفروع على الخادم البعيد. تتحدث عند التنزيل أو السحب.',
'mod20.s2.title': 'إعداد تتبع المنبع',
'mod20.s2.desc': 'تتبع المنبع يربط فرعك المحلي بفرع بعيد. اضبطه بـ "git push -u origin feature" أو "git branch -u origin/feature". بعد الإعداد، "git push" و "git pull" تعملان بدون تحديد البعيد.',
'mod20.s3.title': 'الدفع بمواصفات المراجع',
'mod20.s3.desc': 'صيغة النقطتين "git push origin main:production" تدفع فرعك المحلي main إلى فرع production البعيد. هذا يفصل أسماء الفروع المحلية والبعيدة.',
'mod20.s4.title': 'التنزيل بمواصفات المراجع',
'mod20.s4.desc': 'بالمثل، "git fetch origin main" تنزّل فرع main فقط. صيغة النقطتين تحدد بدقة أين تُخزّن البيانات المُنزّلة محلياً.',
'mod20.s5.title': 'التعامل مع التاريخ المتباعد',
'mod20.s5.desc': 'عندما يحصل فرعاك المحلي والبعيد على إيداعات جديدة، يتباعدان. استخدم "git pull --rebase" لإعادة تشغيل إيداعاتك المحلية فوق التغييرات البعيدة.',
'mod20.s6.title': 'الدفع الإجباري الآمن',
'mod20.s6.desc': 'بعد تعديل أو إعادة تأسيس الإيداعات المحلية، الدفع العادي سيفشل. استخدم "git push --force-with-lease" بدلاً من --force. ينجح فقط إذا لم يتم تحديث البعيد من شخص آخر.',
'mod20.s6.warning': 'لا تستخدم "git push --force" أبداً على الفروع المشتركة. استخدم --force-with-lease دائماً للأمان.',
'mod20.s7.title': 'عدة مستودعات بعيدة والتفريعات',
'mod20.s7.desc': 'عند المساهمة في المصادر المفتوحة، لديك عادةً بعيدان: "origin" (تفريعتك) و "upstream" (المستودع الأصلي). أضف upstream بـ "git remote add upstream <url>".',
// Module 21
'mod21.title': 'Git Bisect وتصحيح الأخطاء',
'mod21.desc': 'استخدم Git bisect للعثور بكفاءة على الإيداع الذي أدخل خطأً، و git blame لتتبع من غيّر ماذا ومتى.',
'mod21.s1.title': 'ما هو Git Bisect',
'mod21.s1.desc': 'Git bisect يجري بحثاً ثنائياً في تاريخ إيداعاتك للعثور على الإيداع الذي أدخل خطأً. بدلاً من فحص كل إيداع، ينصّف مساحة البحث كل مرة.',
'mod21.s2.title': 'بدء Bisect',
'mod21.s2.desc': 'ابدأ بـ "git bisect start"، ثم ضع علامة سيئ على الإيداع الحالي بـ "git bisect bad" وعلامة جيد على إيداع معروف بـ "git bisect good <hash>". سينتقل Git إلى إيداع في المنتصف لتختبره.',
'mod21.s3.title': 'جولة Bisect',
'mod21.s3.desc': 'في كل خطوة، اختبر وجود الخطأ. نفّذ "git bisect good" إذا لم يكن الخطأ موجوداً، أو "git bisect bad" إذا كان موجوداً. يضيّق Git النطاق كل مرة.',
'mod21.s4.title': 'إنهاء Bisect',
'mod21.s4.desc': 'عندما يحدد Git أول إيداع سيئ، يعرضه مع الهاش والمؤلف والتاريخ والرسالة. نفّذ "git bisect reset" للعودة إلى HEAD الأصلي.',
'mod21.s5.title': 'Bisect الآلي',
'mod21.s5.desc': 'للاختبار الآلي، استخدم "git bisect run <test-script>". سيشغّل Git سكريبتك تلقائياً في كل خطوة — إذا أرجع 0 يعتبره جيداً، غير ذلك سيئاً.',
'mod21.s6.title': 'Git Blame',
'mod21.s6.desc': 'استخدم "git blame <file>" لرؤية من عدّل كل سطر آخر مرة، مع هاش الإيداع والتاريخ. في VSCode، إضافة GitLens توفر تعليقات blame مدمجة.',
'mod21.s6.vscode': 'ثبّت إضافة GitLens للحصول على تعليقات blame مدمجة وتفاصيل الإيداعات عند التمرير.',

// New Quiz (Arabic)
'quiz.b9.q': 'ما الفرق بين "git switch" و "git checkout"؟',
'quiz.b9.o1': 'هما نفس الأمر تماماً',
'quiz.b9.o2': '"git switch" لتبديل الفروع فقط؛ "git checkout" يمكنه أيضاً استعادة الملفات',
'quiz.b9.o3': '"git switch" مهمل لصالح "git checkout"',
'quiz.b9.o4': '"git switch" يعمل فقط مع الفروع البعيدة',
'quiz.b9.explain': 'أُضيف "git switch" في Git 2.23 خصيصاً لتبديل الفروع. "git checkout" محمّل بوظائف كثيرة. استخدم "git switch" للفروع و "git restore" للملفات.',
'quiz.b10.q': 'ماذا يعرض "git log --oneline"؟',
'quiz.b10.o1': 'سجل مختصر بإيداع واحد لكل سطر يظهر الهاش والرسالة',
'quiz.b10.o2': 'آخر إيداع فقط',
'quiz.b10.o3': 'الفرق الكامل لكل إيداع في سطر واحد',
'quiz.b10.o4': 'إيداعات الفرع الحالي غير المدمجة فقط',
'quiz.b10.explain': '"git log --oneline" يعرض كل إيداع في سطر واحد مع الهاش المختصر وأول سطر من رسالة الإيداع.',
'quiz.b11.q': 'ماذا يحدث إذا حاولت تبديل الفروع مع تغييرات غير مُودعة؟',
'quiz.b11.o1': 'Git يودع تغييراتك تلقائياً',
'quiz.b11.o2': 'Git يتجاهل التغييرات بصمت',
'quiz.b11.o3': 'Git قد يمنع التبديل ويطلب منك الإيداع أو التخزين المؤقت',
'quiz.b11.o4': 'Git ينشئ فرعاً مؤقتاً للتغييرات',
'quiz.b11.explain': 'إذا كانت تغييراتك تتعارض مع الفرع الهدف، سيلغي Git التبديل ويطلب منك الإيداع أو التخزين المؤقت أولاً.',
'quiz.b12.q': 'ما الغرض من ملف .gitignore؟',
'quiz.b12.o1': 'تحديد الملفات والأنماط التي يجب أن يتجاهلها Git',
'quiz.b12.o2': 'سرد الملفات التي يجب حذفها من المستودع',
'quiz.b12.o3': 'إخفاء الملفات من المتعاونين الآخرين',
'quiz.b12.o4': 'ضغط الملفات لتوفير المساحة في المستودع',
'quiz.b12.explain': '.gitignore يخبر Git أي ملفات أو أنماط يتجاهلها. الإدخالات الشائعة تشمل node_modules/ و .env و *.log.',
'quiz.i9.q': 'ما هي حالة HEAD المنفصل؟',
'quiz.i9.o1': 'عندما يشير HEAD مباشرة إلى إيداع بدلاً من مرجع فرع',
'quiz.i9.o2': 'عندما يكون ملف HEAD تالفاً',
'quiz.i9.o3': 'عندما لا يكون لديك إيداعات في مستودعك',
'quiz.i9.o4': 'عندما يشير HEAD إلى فرع بعيد',
'quiz.i9.explain': 'HEAD المنفصل يحدث عند الانتقال إلى هاش إيداع محدد أو وسم. HEAD يشير مباشرة إلى إيداع بدلاً من فرع.',
'quiz.i10.q': 'ماذا يفعل "git checkout HEAD~3"؟',
'quiz.i10.o1': 'يحذف آخر 3 إيداعات نهائياً',
'quiz.i10.o2': 'ينشئ فرعاً جديداً 3 إيداعات خلف HEAD',
'quiz.i10.o3': 'ينقل HEAD للخلف 3 إيداعات (HEAD منفصل)',
'quiz.i10.o4': 'يعكس آخر 3 إيداعات بإيداعات تراجع جديدة',
'quiz.i10.explain': '"git checkout HEAD~3" ينقل HEAD إلى الإيداع الذي يبعد 3 أجيال للخلف. هذا يضعك في حالة HEAD منفصل.',
'quiz.i11.q': 'ماذا يفعل "git branch -f main HEAD~2"؟',
'quiz.i11.o1': 'يجبر مؤشر فرع main على الانتقال إيداعين خلف HEAD',
'quiz.i11.o2': 'ينشئ فرعاً جديداً يسمى main',
'quiz.i11.o3': 'يحذف فرع main',
'quiz.i11.o4': 'يدمج HEAD~2 في main',
'quiz.i11.explain': '"git branch -f" ينقل مؤشر فرع إجبارياً إلى أي إيداع. استخدمه بحذر على الفروع المشتركة.',
'quiz.i12.q': 'ما الفرق بين ^ و ~ في Git؟',
'quiz.i12.o1': '^ تختار أباً عند إيداعات الدمج؛ ~ تتراجع عدداً من الأجيال',
'quiz.i12.o2': 'هما نفس الشيء تماماً',
'quiz.i12.o3': '^ للفروع؛ ~ للوسوم',
'quiz.i12.o4': '^ تتقدم للأمام؛ ~ تتراجع للخلف',
'quiz.i12.explain': '~ تتراجع N جيل متبعة الأب الأول: HEAD~3 = 3 إيداعات للخلف. ^ تختار أي أب عند إيداعات الدمج: HEAD^2 = الأب الثاني.',
'quiz.a9.q': 'ماذا يفعل "git push --force-with-lease"؟',
'quiz.a9.o1': 'يدفع إجبارياً فقط إذا لم يحدّث الفرع البعيد من شخص آخر',
'quiz.a9.o2': 'يدفع ويدمج التغييرات البعيدة تلقائياً',
'quiz.a9.o3': 'مثل "git push --force" لكن ينشئ نسخة احتياطية',
'quiz.a9.o4': 'يدفع الملفات المُودعة فقط متجاهلاً المُجهّزة',
'quiz.a9.explain': '--force-with-lease بديل أكثر أماناً لـ --force. يتحقق أن الفرع البعيد لم يتغير منذ آخر تنزيل.',
'quiz.a10.q': 'لماذا يُستخدم "git bisect"؟',
'quiz.a10.o1': 'البحث الثنائي في الإيداعات لإيجاد الإيداع الذي أدخل خطأً',
'quiz.a10.o2': 'تقسيم فرع إلى فرعين منفصلين',
'quiz.a10.o3': 'مقارنة الفروقات بين فرعين',
'quiz.a10.o4': 'دمج فرعين عند نقطتهما الوسطى',
'quiz.a10.explain': 'Git bisect يجري بحثاً ثنائياً في تاريخ إيداعاتك. تضع علامة على إيداع سيئ وآخر جيد، ويفحص Git النقطة الوسطى.',
'quiz.a11.q': 'ماذا يفعل "git push origin main:production"؟',
'quiz.a11.o1': 'يدفع فرع main المحلي إلى فرع production البعيد',
'quiz.a11.o2': 'يدمج production في main محلياً',
'quiz.a11.o3': 'يعيد تسمية فرع main إلى production',
'quiz.a11.o4': 'ينشئ فرعي main و production على البعيد',
'quiz.a11.explain': 'صيغة النقطتين تحدد <مصدر-محلي>:<وجهة-بعيدة>. تأخذ الإيداعات من main المحلي وتدفعها إلى فرع production على البعيد.',
'quiz.a12.q': 'ما الغرض من "git rebase -i HEAD~4"؟',
'quiz.a12.o1': 'يفتح محرراً تفاعلياً لإعادة ترتيب أو دمج أو تعديل أو حذف آخر 4 إيداعات',
'quiz.a12.o2': 'يحذف آخر 4 إيداعات',
'quiz.a12.o3': 'ينشئ 4 فروع جديدة من HEAD',
'quiz.a12.o4': 'يعكس آخر 4 إيداعات بإيداعات تراجع',
'quiz.a12.explain': 'إعادة التأسيس التفاعلي (-i) تفتح محررك تعرض آخر 4 إيداعات مع إجراءات. يمكنك pick أو reword أو squash أو edit أو drop كل إيداع.',
'quiz.a13.q': 'ماذا يفعل خطاف pre-commit؟',
'quiz.a13.o1': 'يشغّل سكريبتاً قبل كل إيداع، عادةً للفحص والتنسيق',
'quiz.a13.o2': 'يمنع أي شخص من الإيداع في الفرع الرئيسي',
'quiz.a13.o3': 'يكتب رسائل الإيداع تلقائياً',
'quiz.a13.o4': 'يرسل إشعاراً لأعضاء الفريق قبل كل إيداع',
'quiz.a13.explain': 'خطاف pre-commit سكريبت يعمل قبل إنشاء الإيداع. إذا خرج بحالة غير صفرية، يُلغى الإيداع.',
'quiz.a14.q': 'لماذا يُستخدم "git blame"؟',
'quiz.a14.o1': 'يُظهر من عدّل كل سطر في ملف آخر مرة وفي أي إيداع',
'quiz.a14.o2': 'يسرد جميع المساهمين في المستودع',
'quiz.a14.o3': 'يجد ويبلّغ عن انتهاكات أسلوب الكود',
'quiz.a14.o4': 'يحدد تعارضات الدمج في ملف',
'quiz.a14.explain': '"git blame <file>" يضع تعليقاً على كل سطر بهاش الإيداع والمؤلف والتاريخ لآخر تعديل.',

// New challenges (Arabic)
'terminal.ch.detachedHead': 'تنقل HEAD المنفصل',
'terminal.ch.detachedHead.desc': 'تنقّل في تاريخ الإيداعات باستخدام المراجع النسبية وتعلّم العمل في حالة HEAD المنفصل.',
'terminal.ch.detachedHead.s1': 'هيّئ مستودعاً جديداً',
'terminal.ch.detachedHead.s1.hint': 'git init',
'terminal.ch.detachedHead.s2': 'أنشئ ملفاً',
'terminal.ch.detachedHead.s2.hint': 'touch file1.txt',
'terminal.ch.detachedHead.s3': 'جهّز الملف',
'terminal.ch.detachedHead.s3.hint': 'git add file1.txt',
'terminal.ch.detachedHead.s4': 'أنشئ أول إيداع',
'terminal.ch.detachedHead.s4.hint': 'git commit -m "first commit"',
'terminal.ch.detachedHead.s5': 'أنشئ ملفاً آخر',
'terminal.ch.detachedHead.s5.hint': 'touch file2.txt',
'terminal.ch.detachedHead.s6': 'جهّز وأودع',
'terminal.ch.detachedHead.s6.hint': 'git add . && git commit -m "second commit"',
'terminal.ch.detachedHead.s7': 'اعرض سجل الإيداعات',
'terminal.ch.detachedHead.s7.hint': 'git log --oneline',
'terminal.ch.detachedHead.s8': 'ارجع إيداعاً واحداً (HEAD منفصل)',
'terminal.ch.detachedHead.s8.hint': 'git checkout HEAD~1',
'terminal.ch.detachedHead.s9': 'عد إلى فرع main',
'terminal.ch.detachedHead.s9.hint': 'git checkout main',
'terminal.ch.pullRebase': 'سحب مع إعادة التأسيس',
'terminal.ch.pullRebase.desc': 'تعامل مع التاريخ المتباعد بسحب مع إعادة التأسيس لتاريخ خطي نظيف.',
'terminal.ch.pullRebase.s1': 'هيّئ المستودع',
'terminal.ch.pullRebase.s1.hint': 'git init',
'terminal.ch.pullRebase.s2': 'أضف مستودعاً بعيداً',
'terminal.ch.pullRebase.s2.hint': 'git remote add origin https://github.com/user/repo.git',
'terminal.ch.pullRebase.s3': 'أنشئ ملفاً',
'terminal.ch.pullRebase.s3.hint': 'touch app.js',
'terminal.ch.pullRebase.s4': 'جهّز وأودع',
'terminal.ch.pullRebase.s4.hint': 'git add . && git commit -m "initial"',
'terminal.ch.pullRebase.s5': 'ادفع إلى البعيد',
'terminal.ch.pullRebase.s5.hint': 'git push -u origin main',
'terminal.ch.pullRebase.s6': 'أجرِ تغييراً محلياً وأودع',
'terminal.ch.pullRebase.s6.hint': 'touch local.js && git add . && git commit -m "local work"',
'terminal.ch.pullRebase.s7': 'اسحب مع إعادة التأسيس',
'terminal.ch.pullRebase.s7.hint': 'git pull --rebase origin main',
'terminal.ch.interactiveRebase': 'إعادة التأسيس التفاعلي',
'terminal.ch.interactiveRebase.desc': 'استخدم إعادة التأسيس التفاعلي لدمج وتنظيف تاريخ إيداعاتك.',
'terminal.ch.interactiveRebase.s1': 'هيّئ المستودع',
'terminal.ch.interactiveRebase.s1.hint': 'git init',
'terminal.ch.interactiveRebase.s2': 'أنشئ ملف1 وأودع',
'terminal.ch.interactiveRebase.s2.hint': 'touch file1.txt',
'terminal.ch.interactiveRebase.s3': 'جهّز وأودع ملف1',
'terminal.ch.interactiveRebase.s3.hint': 'git add . && git commit -m "add file1"',
'terminal.ch.interactiveRebase.s4': 'أنشئ ملف2',
'terminal.ch.interactiveRebase.s4.hint': 'touch file2.txt',
'terminal.ch.interactiveRebase.s5': 'جهّز وأودع ملف2',
'terminal.ch.interactiveRebase.s5.hint': 'git add . && git commit -m "add file2"',
'terminal.ch.interactiveRebase.s6': 'أنشئ ملف3',
'terminal.ch.interactiveRebase.s6.hint': 'touch file3.txt',
'terminal.ch.interactiveRebase.s7': 'جهّز وأودع ملف3',
'terminal.ch.interactiveRebase.s7.hint': 'git add . && git commit -m "add file3"',
'terminal.ch.interactiveRebase.s8': 'اعرض التاريخ',
'terminal.ch.interactiveRebase.s8.hint': 'git log --oneline',
'terminal.ch.interactiveRebase.s9': 'ابدأ إعادة التأسيس التفاعلي',
'terminal.ch.interactiveRebase.s9.hint': 'git rebase -i HEAD~3',
'terminal.ch.bisect': 'صيد الأخطاء مع Bisect',
'terminal.ch.bisect.desc': 'استخدم git bisect لإجراء بحث ثنائي وإيجاد الإيداع الذي أدخل خطأً.',
'terminal.ch.bisect.s1': 'هيّئ المستودع',
'terminal.ch.bisect.s1.hint': 'git init',
'terminal.ch.bisect.s2': 'أنشئ التطبيق وأودع (نسخة عاملة)',
'terminal.ch.bisect.s2.hint': 'touch app.js',
'terminal.ch.bisect.s3': 'جهّز وأودع v1',
'terminal.ch.bisect.s3.hint': 'git add . && git commit -m "v1 working"',
'terminal.ch.bisect.s4': 'أجرِ تغييرات (نسخة معطوبة)',
'terminal.ch.bisect.s4.hint': 'echo "bug" >> app.js',
'terminal.ch.bisect.s5': 'جهّز وأودع v2',
'terminal.ch.bisect.s5.hint': 'git add . && git commit -m "v2 broken"',
'terminal.ch.bisect.s6': 'ابدأ bisect',
'terminal.ch.bisect.s6.hint': 'git bisect start',
'terminal.ch.bisect.s7': 'ضع علامة سيئ على الإيداع الحالي',
'terminal.ch.bisect.s7.hint': 'git bisect bad',
'terminal.ch.bisect.s8': 'ضع علامة جيد على أول إيداع',
'terminal.ch.bisect.s8.hint': 'git bisect good HEAD~1',
'terminal.ch.bisect.s9': 'أنهِ جلسة bisect',
'terminal.ch.bisect.s9.hint': 'git bisect reset',
'terminal.ch.forcePush': 'الدفع الإجباري الآمن',
'terminal.ch.forcePush.desc': 'تعلّم استخدام --force-with-lease للدفع الإجباري الآمن بعد تعديل الإيداعات.',
'terminal.ch.forcePush.s1': 'هيّئ المستودع',
'terminal.ch.forcePush.s1.hint': 'git init',
'terminal.ch.forcePush.s2': 'أضف بعيداً',
'terminal.ch.forcePush.s2.hint': 'git remote add origin https://github.com/user/repo.git',
'terminal.ch.forcePush.s3': 'أنشئ ملفاً وأودع',
'terminal.ch.forcePush.s3.hint': 'touch app.js',
'terminal.ch.forcePush.s4': 'جهّز وأودع',
'terminal.ch.forcePush.s4.hint': 'git add . && git commit -m "initial"',
'terminal.ch.forcePush.s5': 'ادفع إلى البعيد',
'terminal.ch.forcePush.s5.hint': 'git push -u origin main',
'terminal.ch.forcePush.s6': 'عدّل آخر إيداع',
'terminal.ch.forcePush.s6.hint': 'git commit --amend -m "improved initial"',
'terminal.ch.forcePush.s7': 'ادفع إجبارياً بأمان',
'terminal.ch.forcePush.s7.hint': 'git push --force-with-lease',

// Cheat sheet categories (Arabic)
'cheat.cat.setup': 'الإعداد والتكوين',
'cheat.cat.creating': 'إنشاء المستودعات',
'cheat.cat.basic': 'اللقطات الأساسية',
'cheat.cat.branching': 'التفريع والتبديل',
'cheat.cat.merging': 'الدمج',
'cheat.cat.remote': 'المستودعات البعيدة',
'cheat.cat.inspection': 'الفحص والتاريخ',
'cheat.cat.undoing': 'التراجع عن التغييرات',

// Cheat sheet commands (Arabic)
'cheat.config.name': 'تعيين الاسم المرتبط بإيداعاتك',
'cheat.config.email': 'تعيين البريد الإلكتروني المرتبط بإيداعاتك',
'cheat.config.editor': 'تعيين محرر النصوص الافتراضي',
'cheat.config.defaultbranch': 'تعيين اسم الفرع الافتراضي',
'cheat.config.color': 'تفعيل الإخراج الملوّن',
'cheat.config.list': 'عرض جميع الإعدادات',
'cheat.config.alias': 'إنشاء اختصار لأمر',
'cheat.init': 'إنشاء مستودع محلي جديد',
'cheat.clone': 'نسخ مستودع بعيد',
'cheat.clone.branch': 'نسخ فرع محدد',
'cheat.clone.shallow': 'نسخ بتاريخ محدود',
'cheat.status': 'عرض حالة شجرة العمل',
'cheat.add.file': 'تهيئة ملف محدد',
'cheat.add.all': 'تهيئة جميع التغييرات',
'cheat.add.patch': 'تهيئة التغييرات تفاعلياً',
'cheat.commit': 'إيداع التغييرات المُهيأة مع رسالة',
'cheat.commit.amend': 'تعديل آخر إيداع',
'cheat.diff': 'عرض التغييرات غير المُهيأة',
'cheat.diff.staged': 'عرض التغييرات المُهيأة',
'cheat.branch.list': 'عرض الفروع المحلية',
'cheat.branch.create': 'إنشاء فرع جديد',
'cheat.switch': 'التبديل إلى فرع',
'cheat.switch.create': 'إنشاء والتبديل إلى فرع',
'cheat.branch.delete': 'حذف فرع مدمج',
'cheat.branch.deleteforce': 'حذف فرع قسرياً',
'cheat.branch.remote': 'عرض الفروع البعيدة',
'cheat.merge': 'دمج فرع في الحالي',
'cheat.merge.noff': 'دمج مع إيداع دمج',
'cheat.merge.abort': 'إلغاء دمج جارٍ',
'cheat.merge.squash': 'دمج مضغوط لفرع',
'cheat.rebase': 'إعادة قاعدة الفرع الحالي على آخر',
'cheat.rebase.interactive': 'إعادة قاعدة تفاعلية لآخر N إيداع',
'cheat.remote.add': 'إضافة مصدر بعيد جديد',
'cheat.remote.list': 'عرض المصادر البعيدة مع الروابط',
'cheat.push': 'دفع الفرع إلى البعيد',
'cheat.push.upstream': 'دفع وتعيين تتبع المنبع',
'cheat.pull': 'سحب التغييرات من البعيد',
'cheat.fetch': 'جلب التغييرات بدون دمج',
'cheat.push.tags': 'دفع جميع العلامات إلى البعيد',
'cheat.log': 'عرض سجل الإيداعات',
'cheat.log.oneline': 'سجل مختصر مع رسم بياني',
'cheat.show': 'عرض تفاصيل إيداع',
'cheat.blame': 'عرض من غيّر كل سطر',
'cheat.diff.branches': 'مقارنة فرعين',
'cheat.shortlog': 'ملخص الإيداعات حسب المؤلف',
'cheat.restore': 'تجاهل تغييرات مجلد العمل',
'cheat.restore.staged': 'إلغاء تهيئة ملف',
'cheat.reset.soft': 'إلغاء إيداع مع إبقاء التغييرات مُهيأة',
'cheat.reset.mixed': 'إلغاء إيداع مع إبقاء التغييرات غير مُهيأة',
'cheat.reset.hard': 'إلغاء إيداع وتجاهل جميع التغييرات',
'cheat.revert': 'عكس إيداع بإيداع جديد',
'cheat.stash': 'تخزين تغييرات العمل مؤقتاً',
'cheat.stash.pop': 'تطبيق وإزالة آخر تخزين مؤقت',
'cheat.reflog': 'عرض سجل تغييرات HEAD',
'cheat.cherrypick': 'تطبيق إيداع محدد على الفرع الحالي',
'cheat.merge.squash': 'دمج فرع مع ضغط الإيداعات',

// Cheat sheet — Navigation & Refs (Arabic)
'cheat.cat.navigation': 'التنقل والمراجع',
'cheat.nav.detach': 'الانتقال إلى إيداع محدد (HEAD منفصل)',
'cheat.nav.parent': 'الانتقال إلى الإيداع الأب',
'cheat.nav.headBack': 'الرجوع 3 إيداعات للخلف',
'cheat.nav.forceMove': 'نقل فرع main قسرياً إيداعين للخلف',
'cheat.nav.describe': 'وصف الموقع الحالي نسبة إلى العلامات',
'cheat.nav.graph': 'رسم بياني مرئي للإيداعات في الطرفية',

// Cheat sheet — Git Hooks (Arabic)
'cheat.cat.hooks': 'خطافات Git',
'cheat.hooks.list': 'عرض قوالب الخطافات المتاحة',
'cheat.hooks.chmod': 'جعل الخطاف قابلاً للتنفيذ',
'cheat.hooks.huskyInit': 'تهيئة Husky لإدارة الخطافات الحديثة',
'cheat.hooks.huskyAdd': 'إضافة خطاف ما قبل الإيداع',
'cheat.hooks.skip': 'تخطي الخطافات لهذا الإيداع',

// Cheat sheet — Debugging (Arabic)
'cheat.cat.debugging': 'تصحيح الأخطاء',
'cheat.debug.start': 'بدء البحث الثنائي عن الأخطاء',
'cheat.debug.bad': 'تحديد الإيداع الحالي كسيئ',
'cheat.debug.good': 'تحديد إيداع معروف كجيد',
'cheat.debug.reset': 'إنهاء البحث الثنائي والعودة إلى HEAD الأصلي',
'cheat.debug.run': 'أتمتة البحث الثنائي بسكريبت اختبار',
'cheat.debug.blame': 'عرض من عدّل كل سطر آخر مرة',

// Cheat sheet — Advanced Operations (Arabic)
'cheat.cat.advanced': 'العمليات المتقدمة',
'cheat.adv.rebaseInteractive': 'إعادة قاعدة تفاعلية لآخر 4 إيداعات',
'cheat.adv.amend': 'تعديل آخر إيداع',
'cheat.adv.forceLease': 'دفع قسري آمن',
'cheat.adv.pushDiffBranch': 'الدفع إلى فرع بعيد مختلف',
'cheat.adv.addUpstream': 'إضافة مصدر بعيد أصلي للنسخ المتفرعة',
'cheat.adv.fetchUpstream': 'جلب من المصدر البعيد الأصلي',
'cheat.adv.worktree': 'إنشاء شجرة عمل مرتبطة',

// Quiz questions — Beginner (Arabic)
'quiz.b1.q': 'ماذا يفعل أمر "git init"؟',
'quiz.b1.o1': 'يثبّت Git على حاسوبك',
'quiz.b1.o2': 'ينشئ مستودع Git جديد في المجلد الحالي',
'quiz.b1.o3': 'يهيئ اتصالاً بعيداً بـ GitHub',
'quiz.b1.o4': 'ينسخ مستودعاً موجوداً',
'quiz.b1.explain': '"git init" ينشئ مجلداً فرعياً .git جديداً في المجلد الحالي، محوّلاً إياه إلى مستودع Git.',
'quiz.b2.q': 'ما هي منطقة التهيئة في Git؟',
'quiz.b2.o1': 'خادم بعيد لتخزين الشيفرة',
'quiz.b2.o2': 'مكان لتتبع الأخطاء',
'quiz.b2.o3': 'منطقة وسيطة تُحضّر فيها التغييرات قبل الإيداع',
'quiz.b2.o4': 'نسخة احتياطية من مستودعك',
'quiz.b2.explain': 'منطقة التهيئة (الفهرس) هي حيث تجمّع التغييرات التي ستدخل في الإيداع التالي.',
'quiz.b3.q': 'ماذا يفعل "git add"؟',
'quiz.b3.o1': 'ينشئ ملفاً جديداً',
'quiz.b3.o2': 'يودع التغييرات في المستودع',
'quiz.b3.o3': 'ينقل التغييرات من مجلد العمل إلى منطقة التهيئة',
'quiz.b3.o4': 'يدفع التغييرات إلى مصدر بعيد',
'quiz.b3.explain': '"git add" يهيئ التغييرات، ينقلها من مجلد العمل إلى منطقة التهيئة للإيداع التالي.',
'quiz.b4.q': 'ما الفرق بين "git add ." و "git add <file>"؟',
'quiz.b4.o1': 'لا فرق بينهما',
'quiz.b4.o2': '"git add ." يهيئ جميع التغييرات؛ "git add <file>" يهيئ ملفاً محدداً',
'quiz.b4.o3': '"git add ." يعمل فقط على لينكس',
'quiz.b4.o4': '"git add <file>" يهيئ جميع الملفات',
'quiz.b4.explain': '"git add ." يهيئ جميع الملفات المعدّلة والجديدة في المجلد الحالي والمجلدات الفرعية، بينما "git add <file>" يهيئ الملف المحدد فقط.',
'quiz.b5.q': 'ما هو الإيداع (commit) في Git؟',
'quiz.b5.o1': 'وعد بالمساهمة في مشروع',
'quiz.b5.o2': 'لقطة من التغييرات المُهيأة في نقطة زمنية',
'quiz.b5.o3': 'فرع في المستودع',
'quiz.b5.o4': 'اتصال بمستودع بعيد',
'quiz.b5.explain': 'الإيداع هو لقطة من جميع التغييرات المُهيأة، تُحفظ بشكل دائم في المستودع مع تجزئة فريدة ومعلومات المؤلف ورسالة.',
'quiz.b6.q': 'ماذا يعرض "git status"؟',
'quiz.b6.o1': 'سجل الإيداعات',
'quiz.b6.o2': 'الفرع الحالي، التغييرات المُهيأة وغير المُهيأة، والملفات غير المتتبعة',
'quiz.b6.o3': 'معلومات المستودع البعيد',
'quiz.b6.o4': 'إعدادات التكوين',
'quiz.b6.explain': '"git status" يعرض حالة مجلد العمل ومنطقة التهيئة، يُظهر التغييرات المُهيأة وغير المُهيأة وغير المتتبعة.',
'quiz.b7.q': 'أي علامة تُستخدم لكتابة رسالة الإيداع مباشرة؟',
'quiz.b7.o1': '-a',
'quiz.b7.o2': '-msg',
'quiz.b7.o3': '-m',
'quiz.b7.o4': '--message-inline',
'quiz.b7.explain': 'علامة -m تتيح كتابة رسالة الإيداع مباشرة في الأمر: git commit -m "رسالتك هنا".',
'quiz.b8.q': 'ما هو مجلد .git؟',
'quiz.b8.o1': 'مجلد يحتوي على شيفرتك المصدرية',
'quiz.b8.o2': 'مجلد مخفي يحتوي على جميع بيانات Git الوصفية وقاعدة بيانات الكائنات',
'quiz.b8.o3': 'ملف تكوين لـ Git',
'quiz.b8.o4': 'مجلد يُنشأ على GitHub',
'quiz.b8.explain': 'مجلد .git يخزن جميع المعلومات التي يحتاجها Git: قاعدة بيانات الكائنات والمراجع والخطافات والتكوين وأكثر. حذفه يزيل كل تاريخ الإصدارات.',

// Quiz questions — Intermediate (Arabic)
'quiz.i1.q': 'ما هو الدمج السريع (fast-forward merge)؟',
'quiz.i1.o1': 'دمج أسرع من الدمج العادي',
'quiz.i1.o2': 'دمج يتحرك فيه مؤشر الفرع المستهدف للأمام إلى رأس فرع الميزة بدون إيداع دمج',
'quiz.i1.o3': 'دمج يتجاوز حل التعارضات',
'quiz.i1.o4': 'دمج يعمل فقط على الفروع البعيدة',
'quiz.i1.explain': 'يحدث الدمج السريع عندما لا توجد إيداعات جديدة على الفرع المستهدف. يحرّك Git المؤشر ببساطة للأمام — لا حاجة لإيداع دمج.',
'quiz.i2.q': 'ما الفرق بين "git fetch" و "git pull"؟',
'quiz.i2.o1': 'هما نفس الأمر بأسماء مختلفة',
'quiz.i2.o2': 'الجلب يحمّل التغييرات بدون دمج؛ السحب يحمّل ويدمج',
'quiz.i2.o3': 'الجلب يعمل مع SSH؛ السحب يعمل مع HTTPS',
'quiz.i2.o4': 'السحب يحمّل التغييرات بدون دمج؛ الجلب يحمّل ويدمج',
'quiz.i2.explain': '"git fetch" يحمّل البيانات من المصدر البعيد لكن يترك مجلد عملك كما هو. "git pull" يقوم بجلب ثم دمج في فرعك الحالي.',
'quiz.i3.q': 'ماذا يعرض "git remote -v"؟',
'quiz.i3.o1': 'إصدار Git',
'quiz.i3.o2': 'سجل الإيداعات المفصّل',
'quiz.i3.o3': 'أسماء وروابط المستودعات البعيدة المُعدّة',
'quiz.i3.o4': 'قائمة الفروع الافتراضية',
'quiz.i3.explain': '"git remote -v" يعرض الأسماء المختصرة والروابط المقابلة للمستودعات البعيدة المُعدّة للجلب والدفع.',
'quiz.i4.q': 'كيف تنشئ وتبدّل إلى فرع جديد بأمر واحد؟',
'quiz.i4.o1': 'git branch new-branch && git switch new-branch',
'quiz.i4.o2': 'git switch -c new-branch',
'quiz.i4.o3': 'git new-branch',
'quiz.i4.o4': 'git create new-branch',
'quiz.i4.explain': '"git switch -c branch-name" ينشئ فرعاً جديداً ويبدّل إليه. المكافئ الأقدم هو "git checkout -b branch-name".',
'quiz.i5.q': 'ما هي علامات التعارض في تعارض الدمج؟',
'quiz.i5.o1': '<<< === >>>',
'quiz.i5.o2': '<<<<<<< ======= >>>>>>>',
'quiz.i5.o3': '### --- ###',
'quiz.i5.o4': '*** === ***',
'quiz.i5.explain': 'يستخدم Git <<<<<<< لتحديد بداية تغييراتك، ======= لفصل النسختين، و >>>>>>> لتحديد نهاية التغييرات الواردة.',
'quiz.i6.q': 'ما هو HEAD في Git؟',
'quiz.i6.o1': 'أول إيداع في المستودع',
'quiz.i6.o2': 'مؤشر إلى مرجع الفرع الحالي (آخر إيداع على الفرع الحالي)',
'quiz.i6.o3': 'الفرع الرئيسي',
'quiz.i6.o4': 'المستودع البعيد',
'quiz.i6.explain': 'HEAD هو مؤشر خاص يشير إلى مرجع الفرع الحالي. عادة يشير إلى آخر إيداع على فرعك الحالي.',
'quiz.i7.q': 'كيف تحذف فرعاً بعيداً؟',
'quiz.i7.o1': 'git branch -d remote/branch',
'quiz.i7.o2': 'git push origin --delete branch-name',
'quiz.i7.o3': 'git remote delete branch-name',
'quiz.i7.o4': 'git delete origin/branch-name',
'quiz.i7.explain': '"git push origin --delete branch-name" يزيل الفرع من المستودع البعيد.',
'quiz.i8.q': 'ماذا تفعل علامة -u في "git push -u origin main"؟',
'quiz.i8.o1': 'تحدّث المستودع',
'quiz.i8.o2': 'تفتح الفرع للدفع',
'quiz.i8.o3': 'تعيّن مرجع التتبع المنبع ليحتاج الدفع/السحب مستقبلاً بدون معاملات',
'quiz.i8.o4': 'ترفع الملفات غير المتتبعة فقط',
'quiz.i8.explain': 'علامة -u (--set-upstream) تنشئ علاقة تتبع بين الفروع المحلية والبعيدة، مما يبسّط أوامر الدفع والسحب المستقبلية.',

// Quiz questions — Advanced (Arabic)
'quiz.a1.q': 'ما هو إعادة القاعدة (rebase) في Git؟',
'quiz.a1.o1': 'إعادة تسمية الفرع الأساسي',
'quiz.a1.o2': 'إعادة تطبيق الإيداعات فوق رأس قاعدة مختلفة لإنشاء تاريخ خطي',
'quiz.a1.o3': 'إنشاء نسخة احتياطية من المستودع',
'quiz.a1.o4': 'إعادة تعيين جميع الفروع إلى حالتها الأولية',
'quiz.a1.explain': 'إعادة القاعدة تأخذ إيداعات من فرع وتعيد تطبيقها فوق فرع آخر، منشئة تاريخاً نظيفاً وخطياً بدون إيداعات دمج.',
'quiz.a2.q': 'ما الفرق بين "git reset --soft" و "git reset --hard"؟',
'quiz.a2.o1': 'الناعم أسرع من الصلب',
'quiz.a2.o2': 'الناعم يبقي التغييرات مُهيأة؛ الصلب يتخلص من جميع التغييرات نهائياً',
'quiz.a2.o3': 'لا فرق بينهما',
'quiz.a2.o4': 'الصلب للمستودعات البعيدة فقط؛ الناعم للمحلية',
'quiz.a2.explain': '--soft يحرّك HEAD لكن يبقي التغييرات مُهيأة. --hard يحرّك HEAD ويتخلص من جميع التغييرات في منطقة التهيئة ومجلد العمل — هذا مدمّر.',
'quiz.a3.q': 'ما هو Cherry-pick؟',
'quiz.a3.o1': 'اختيار الملفات لتضمينها في إيداع',
'quiz.a3.o2': 'تطبيق إيداع محدد من فرع على فرع آخر',
'quiz.a3.o3': 'اختيار أي فرع للدمج',
'quiz.a3.o4': 'اختيار أفضل استراتيجية دمج',
'quiz.a3.explain': '"git cherry-pick <hash>" يأخذ إيداعاً واحداً من أي مكان في المستودع ويطبقه على فرعك الحالي كإيداع جديد.',
'quiz.a4.q': 'متى يجب ألا تستخدم rebase؟',
'quiz.a4.o1': 'عند العمل بمفردك',
'quiz.a4.o2': 'عندما تكون الإيداعات قد دُفعت بالفعل إلى فرع مشترك/عام',
'quiz.a4.o3': 'عند استخدام VSCode',
'quiz.a4.o4': 'عند العمل مع العلامات',
'quiz.a4.explain': 'لا تعد قاعدة إيداعات موجودة على فرع بعيد مشترك أبداً. إعادة القاعدة تعيد كتابة التاريخ، مما يسبب تعارضات لأي شخص بنى عمله على تلك الإيداعات.',
'quiz.a5.q': 'ماذا يتتبع "git reflog"؟',
'quiz.a5.o1': 'تغييرات المستودع البعيد',
'quiz.a5.o2': 'كل تحديث لرأس الفروع و HEAD، بما في ذلك إعادات التعيين وإعادات القاعدة',
'quiz.a5.o3': 'طوابع زمنية لتعديل الملفات',
'quiz.a5.o4': 'سجلات اتصال الشبكة',
'quiz.a5.explain': 'Reflog يسجل كل تغيير على HEAD محلياً — إيداعات، إعادات تعيين، إعادات قاعدة، تبديلات. إنه شبكة أمانك لاسترجاع الإيداعات "المفقودة".',
'quiz.a6.q': 'ما هي العلامة المشروحة (annotated tag)؟',
'quiz.a6.o1': 'علامة مع تعليقات في الشيفرة',
'quiz.a6.o2': 'كائن علامة كامل مع اسم الواضع وبريده وتاريخه ورسالة — يُنصح بها للإصدارات',
'quiz.a6.o3': 'علامة تتزامن تلقائياً مع البعيد',
'quiz.a6.o4': 'علامة تتضمن مراجعة شيفرة',
'quiz.a6.explain': 'العلامات المشروحة هي كائنات Git كاملة مع بيانات وصفية (الاسم، البريد، التاريخ، الرسالة). تُنشأ بـ "git tag -a v1.0 -m message". مفضّلة لإصدارات الإنتاج.',
'quiz.a7.q': 'ما هو التطوير القائم على الجذع (trunk-based development)؟',
'quiz.a7.o1': 'سير عمل تسمّى فيه الفروع على أسماء أجزاء الشجرة',
'quiz.a7.o2': 'سير عمل يودع فيه جميع المطورين في فرع رئيسي واحد باستخدام فروع ميزات قصيرة العمر',
'quiz.a7.o3': 'سير عمل يعمل فقط مع SVN',
'quiz.a7.o4': 'سير عمل يُحذف فيه الفرع الرئيسي بعد كل إصدار',
'quiz.a7.explain': 'التطوير القائم على الجذع يجعل الجميع يودعون في فرع "جذع" (main) واحد. فروع الميزات قصيرة العمر جداً. يركز على CI/CD ويستخدم أعلام الميزات للعمل غير المكتمل.',
'quiz.a8.q': 'ماذا يفعل "git stash pop"؟',
'quiz.a8.o1': 'يحذف التخزين المؤقت نهائياً',
'quiz.a8.o2': 'يطبق أحدث تخزين مؤقت ويزيله من قائمة التخزينات',
'quiz.a8.o3': 'يعرض محتويات التخزين المؤقت',
'quiz.a8.o4': 'ينشئ تخزيناً مؤقتاً جديداً',
'quiz.a8.explain': '"git stash pop" يطبق أحدث تخزين (stash@{0}) على مجلد عملك ويزيله من قائمة التخزينات. استخدم "apply" للإبقاء على التخزين.'
}
};

// ==================== MODULES DATA ====================
const modules = [
{
    id: 1, titleKey: 'mod1.title', descKey: 'mod1.desc', level: 'beginner', duration: 10,
    icon: 'fa-solid fa-book-open', gradient: 'linear-gradient(135deg, #F05032, #ff7b5e)',
    steps: [
        { titleKey: 'mod1.s1.title', descKey: 'mod1.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod1.s2.title', descKey: 'mod1.s2.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod1.s3.title', descKey: 'mod1.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod1.s4.title', descKey: 'mod1.s4.desc',
          commands: { windows: 'git --version', mac: 'git --version', linux: 'git --version' },
          output: 'git version 2.43.0', vscodeKey: 'mod1.s4.vscode', tipKey: 'mod1.s4.tip', warningKey: null }
    ]
},
{
    id: 2, titleKey: 'mod2.title', descKey: 'mod2.desc', level: 'beginner', duration: 15,
    icon: 'fa-solid fa-download', gradient: 'linear-gradient(135deg, #2ea44f, #56d364)',
    steps: [
        { titleKey: 'mod2.s1.title', descKey: 'mod2.s1.desc',
          commands: { windows: 'Download from https://git-scm.com/download/win', mac: 'brew install git\n# or\nxcode-select --install', linux: 'sudo apt install git\n# or\nsudo dnf install git' },
          output: null, vscodeKey: 'mod2.s1.vscode', tipKey: 'mod2.s1.tip', warningKey: null },
        { titleKey: 'mod2.s2.title', descKey: 'mod2.s2.desc',
          commands: { windows: 'git --version\nwhere git', mac: 'git --version\nwhich git', linux: 'git --version\nwhich git' },
          output: 'git version 2.43.0', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod2.s3.title', descKey: 'mod2.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: 'mod2.s3.tip', warningKey: null },
        { titleKey: 'mod2.s4.title', descKey: 'mod2.s4.desc', commands: null, output: null, vscodeKey: 'mod2.s4.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod2.s5.title', descKey: 'mod2.s5.desc',
          commands: { windows: 'git config --global core.editor "code --wait"\n# Use notepad if VS Code is not installed:\ngit config --global core.editor notepad', mac: 'git config --global core.editor "code --wait"\n# Or use nano:\ngit config --global core.editor nano', linux: 'git config --global core.editor "code --wait"\n# Or use nano:\ngit config --global core.editor nano' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 3, titleKey: 'mod3.title', descKey: 'mod3.desc', level: 'beginner', duration: 10,
    icon: 'fa-solid fa-gear', gradient: 'linear-gradient(135deg, #4000A5, #6E33D6)',
    steps: [
        { titleKey: 'mod3.s1.title', descKey: 'mod3.s1.desc',
          commands: { windows: 'git config --global user.name "Your Name"', mac: 'git config --global user.name "Your Name"', linux: 'git config --global user.name "Your Name"' },
          output: null, vscodeKey: null, tipKey: 'mod3.s1.tip', warningKey: null },
        { titleKey: 'mod3.s2.title', descKey: 'mod3.s2.desc',
          commands: { windows: 'git config --global user.email "you@example.com"', mac: 'git config --global user.email "you@example.com"', linux: 'git config --global user.email "you@example.com"' },
          output: null, vscodeKey: null, tipKey: 'mod3.s2.tip', warningKey: null },
        { titleKey: 'mod3.s3.title', descKey: 'mod3.s3.desc',
          commands: { windows: 'git config --global init.defaultBranch main', mac: 'git config --global init.defaultBranch main', linux: 'git config --global init.defaultBranch main' },
          output: null, vscodeKey: null, tipKey: 'mod3.s3.tip', warningKey: null },
        { titleKey: 'mod3.s4.title', descKey: 'mod3.s4.desc',
          commands: { windows: 'git config --global core.editor "code --wait"\n# Alternative: notepad', mac: 'git config --global core.editor "code --wait"\n# Alternative: nano or vim', linux: 'git config --global core.editor "code --wait"\n# Alternative: nano or vim' },
          output: null, vscodeKey: 'mod3.s4.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod3.s5.title', descKey: 'mod3.s5.desc',
          commands: { windows: 'git config --global color.ui auto\ngit config --global core.autocrlf true', mac: 'git config --global color.ui auto\ngit config --global core.autocrlf input', linux: 'git config --global color.ui auto\ngit config --global core.autocrlf input' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod3.s6.title', descKey: 'mod3.s6.desc',
          commands: { windows: 'git config --list\n# Config file: C:\\Users\\you\\.gitconfig', mac: 'git config --list\n# Config file: ~/.gitconfig', linux: 'git config --list\n# Config file: ~/.gitconfig' },
          output: 'user.name=Your Name\nuser.email=you@example.com\ninit.defaultbranch=main\ncore.editor=code --wait\ncolor.ui=auto', vscodeKey: null, tipKey: 'mod3.s6.tip', warningKey: null }
    ]
},
{
    id: 4, titleKey: 'mod4.title', descKey: 'mod4.desc', level: 'beginner', duration: 15,
    icon: 'fa-solid fa-folder-plus', gradient: 'linear-gradient(135deg, #0078d4, #4da6ff)',
    steps: [
        { titleKey: 'mod4.s1.title', descKey: 'mod4.s1.desc',
          commands: { windows: 'md my-project\ncd my-project', mac: 'mkdir -p my-project\ncd my-project', linux: 'mkdir -p my-project\ncd my-project' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod4.s2.title', descKey: 'mod4.s2.desc',
          commands: { windows: 'git init', mac: 'git init', linux: 'git init' },
          output: 'Initialized empty Git repository in /home/user/my-project/.git/', vscodeKey: 'mod4.s2.vscode', tipKey: 'mod4.s2.tip', warningKey: null },
        { titleKey: 'mod4.s3.title', descKey: 'mod4.s3.desc',
          commands: { windows: 'dir .git', mac: 'ls -la .git/', linux: 'ls -la .git/' },
          output: 'HEAD\nconfig\ndescription\nhooks/\ninfo/\nobjects/\nrefs/', vscodeKey: null, tipKey: 'mod4.s3.tip', warningKey: null },
        { titleKey: 'mod4.s4.title', descKey: 'mod4.s4.desc',
          commands: { windows: 'echo # My Project > README.md', mac: 'echo "# My Project" > README.md', linux: 'echo "# My Project" > README.md' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod4.s5.title', descKey: 'mod4.s5.desc',
          commands: { windows: 'git status', mac: 'git status', linux: 'git status' },
          output: 'On branch main\n\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tREADME.md\n\nnothing added to commit but untracked files present', vscodeKey: 'mod4.s5.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod4.s6.title', descKey: 'mod4.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: 'mod4.s6.tip', warningKey: null }
    ]
},
{
    id: 5, titleKey: 'mod5.title', descKey: 'mod5.desc', level: 'beginner', duration: 20,
    icon: 'fa-solid fa-code-commit', gradient: 'linear-gradient(135deg, #da3633, #f78166)',
    steps: [
        { titleKey: 'mod5.s1.title', descKey: 'mod5.s1.desc',
          commands: { windows: 'git status', mac: 'git status', linux: 'git status' },
          output: 'On branch main\nUntracked files:\n\tREADME.md', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod5.s2.title', descKey: 'mod5.s2.desc',
          commands: { windows: 'git add README.md', mac: 'git add README.md', linux: 'git add README.md' },
          output: null, vscodeKey: 'mod5.s2.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod5.s3.title', descKey: 'mod5.s3.desc',
          commands: { windows: 'git add .', mac: 'git add .', linux: 'git add .' },
          output: null, vscodeKey: null, tipKey: 'mod5.s3.tip', warningKey: 'mod5.s3.warning' },
        { titleKey: 'mod5.s4.title', descKey: 'mod5.s4.desc',
          commands: { windows: 'git status', mac: 'git status', linux: 'git status' },
          output: 'On branch main\n\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\tnew file:   README.md', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod5.s5.title', descKey: 'mod5.s5.desc',
          commands: { windows: 'git commit -m "Initial commit"', mac: 'git commit -m "Initial commit"', linux: 'git commit -m "Initial commit"' },
          output: '[main (root-commit) a1b2c3d] Initial commit\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md', vscodeKey: 'mod5.s5.vscode', tipKey: 'mod5.s5.tip', warningKey: null },
        { titleKey: 'mod5.s6.title', descKey: 'mod5.s6.desc',
          commands: { windows: 'git log --oneline', mac: 'git log --oneline', linux: 'git log --oneline' },
          output: 'a1b2c3d (HEAD -> main) Initial commit', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod5.s7.title', descKey: 'mod5.s7.desc',
          commands: { windows: 'echo Some content >> README.md\ngit add README.md\ngit commit -m "Update README"', mac: 'echo "Some content" >> README.md\ngit add README.md\ngit commit -m "Update README"', linux: 'echo "Some content" >> README.md\ngit add README.md\ngit commit -m "Update README"' },
          output: '[main d4e5f6a] Update README\n 1 file changed, 1 insertion(+)', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod5.s8.title', descKey: 'mod5.s8.desc',
          commands: { windows: 'git diff', mac: 'git diff', linux: 'git diff' },
          output: 'diff --git a/README.md b/README.md\nindex 1234567..abcdefg 100644\n--- a/README.md\n+++ b/README.md\n@@ -1 +1,2 @@\n # My Project\n+Some new content', vscodeKey: 'mod5.s8.vscode', tipKey: null, warningKey: null }
    ]
},
{
    id: 6, titleKey: 'mod6.title', descKey: 'mod6.desc', level: 'beginner', duration: 15,
    icon: 'fa-solid fa-clock-rotate-left', gradient: 'linear-gradient(135deg, #00C2FF, #2DD4BF)',
    steps: [
        { titleKey: 'mod6.s1.title', descKey: 'mod6.s1.desc',
          commands: { windows: 'git log', mac: 'git log', linux: 'git log' },
          output: 'commit d4e5f6a (HEAD -> main)\nAuthor: Your Name <you@example.com>\nDate:   Mon Jan 15 10:30:00 2024\n\n    Update README\n\ncommit a1b2c3d\nAuthor: Your Name <you@example.com>\nDate:   Mon Jan 15 10:00:00 2024\n\n    Initial commit', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod6.s2.title', descKey: 'mod6.s2.desc',
          commands: { windows: 'git log --oneline --graph --all', mac: 'git log --oneline --graph --all', linux: 'git log --oneline --graph --all' },
          output: '* d4e5f6a (HEAD -> main) Update README\n* a1b2c3d Initial commit', vscodeKey: null, tipKey: 'mod6.s2.tip', warningKey: null },
        { titleKey: 'mod6.s3.title', descKey: 'mod6.s3.desc',
          commands: { windows: 'git log --pretty=format:"%h %an %ar %s"', mac: 'git log --pretty=format:"%h %an %ar %s"', linux: 'git log --pretty=format:"%h %an %ar %s"' },
          output: 'd4e5f6a Your Name 2 hours ago Update README\na1b2c3d Your Name 3 hours ago Initial commit', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod6.s4.title', descKey: 'mod6.s4.desc',
          commands: { windows: 'git show d4e5f6a', mac: 'git show d4e5f6a', linux: 'git show d4e5f6a' },
          output: 'commit d4e5f6a (HEAD -> main)\nAuthor: Your Name <you@example.com>\nDate:   Mon Jan 15 10:30:00 2024\n\n    Update README\n\ndiff --git a/README.md b/README.md\n...', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod6.s5.title', descKey: 'mod6.s5.desc',
          commands: { windows: 'git diff\ngit diff --staged', mac: 'git diff\ngit diff --staged', linux: 'git diff\ngit diff --staged' },
          output: null, vscodeKey: 'mod6.s5.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod6.s6.title', descKey: 'mod6.s6.desc',
          commands: { windows: 'git blame README.md', mac: 'git blame README.md', linux: 'git blame README.md' },
          output: 'a1b2c3d (Your Name 2024-01-15 1) # My Project\nd4e5f6a (Your Name 2024-01-15 2) Some content', vscodeKey: 'mod6.s6.vscode', tipKey: null, warningKey: null }
    ]
},
{
    id: 7, titleKey: 'mod7.title', descKey: 'mod7.desc', level: 'intermediate', duration: 20,
    icon: 'fa-solid fa-code-branch', gradient: 'linear-gradient(135deg, #6E33D6, #00C2FF)',
    steps: [
        { titleKey: 'mod7.s1.title', descKey: 'mod7.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod7.s2.title', descKey: 'mod7.s2.desc',
          commands: { windows: 'git branch', mac: 'git branch', linux: 'git branch' },
          output: '* main', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod7.s3.title', descKey: 'mod7.s3.desc',
          commands: { windows: 'git branch feature-login', mac: 'git branch feature-login', linux: 'git branch feature-login' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod7.s4.title', descKey: 'mod7.s4.desc',
          commands: { windows: 'git switch feature-login\n# or: git checkout feature-login', mac: 'git switch feature-login\n# or: git checkout feature-login', linux: 'git switch feature-login\n# or: git checkout feature-login' },
          output: "Switched to branch 'feature-login'", vscodeKey: null, tipKey: 'mod7.s4.tip', warningKey: null },
        { titleKey: 'mod7.s5.title', descKey: 'mod7.s5.desc',
          commands: { windows: 'git switch -c feature-signup\n# or: git checkout -b feature-signup', mac: 'git switch -c feature-signup\n# or: git checkout -b feature-signup', linux: 'git switch -c feature-signup\n# or: git checkout -b feature-signup' },
          output: "Switched to a new branch 'feature-signup'", vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod7.s6.title', descKey: 'mod7.s6.desc',
          commands: { windows: 'echo login feature > login.js\ngit add login.js\ngit commit -m "Add login feature"', mac: 'echo "login feature" > login.js\ngit add login.js\ngit commit -m "Add login feature"', linux: 'echo "login feature" > login.js\ngit add login.js\ngit commit -m "Add login feature"' },
          output: '[feature-login abc1234] Add login feature\n 1 file changed, 1 insertion(+)\n create mode 100644 login.js', vscodeKey: 'mod7.s6.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod7.s7.title', descKey: 'mod7.s7.desc',
          commands: { windows: 'git branch -d feature-login', mac: 'git branch -d feature-login', linux: 'git branch -d feature-login' },
          output: "Deleted branch feature-login (was abc1234).", vscodeKey: null, tipKey: null, warningKey: 'mod7.s7.warning' }
    ]
},
{
    id: 8, titleKey: 'mod8.title', descKey: 'mod8.desc', level: 'intermediate', duration: 20,
    icon: 'fa-solid fa-code-merge', gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    steps: [
        { titleKey: 'mod8.s1.title', descKey: 'mod8.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod8.s2.title', descKey: 'mod8.s2.desc',
          commands: { windows: 'git switch main', mac: 'git switch main', linux: 'git switch main' },
          output: "Switched to branch 'main'", vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod8.s3.title', descKey: 'mod8.s3.desc',
          commands: { windows: 'git merge feature-login', mac: 'git merge feature-login', linux: 'git merge feature-login' },
          output: 'Updating a1b2c3d..abc1234\nFast-forward\n login.js | 1 +\n 1 file changed, 1 insertion(+)\n create mode 100644 login.js', vscodeKey: 'mod8.s3.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod8.s4.title', descKey: 'mod8.s4.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod8.s5.title', descKey: 'mod8.s5.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod8.s6.title', descKey: 'mod8.s6.desc',
          commands: { windows: 'git log --oneline --graph', mac: 'git log --oneline --graph', linux: 'git log --oneline --graph' },
          output: '*   e5f6g7h (HEAD -> main) Merge branch feature-login\n|\\  \n| * abc1234 Add login feature\n|/  \n* d4e5f6a Update README\n* a1b2c3d Initial commit', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod8.s7.title', descKey: 'mod8.s7.desc',
          commands: { windows: 'git branch -d feature-login', mac: 'git branch -d feature-login', linux: 'git branch -d feature-login' },
          output: "Deleted branch feature-login (was abc1234).", vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 9, titleKey: 'mod9.title', descKey: 'mod9.desc', level: 'intermediate', duration: 25,
    icon: 'fa-brands fa-github', gradient: 'linear-gradient(135deg, #24292e, #586069)',
    steps: [
        { titleKey: 'mod9.s1.title', descKey: 'mod9.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod9.s2.title', descKey: 'mod9.s2.desc', commands: null, output: null, vscodeKey: null, tipKey: 'mod9.s2.tip', warningKey: null },
        { titleKey: 'mod9.s3.title', descKey: 'mod9.s3.desc',
          commands: { windows: 'git remote add origin https://github.com/user/repo.git\n# Or with SSH:\ngit remote add origin git@github.com:user/repo.git', mac: 'git remote add origin git@github.com:user/repo.git\n# Or with HTTPS:\ngit remote add origin https://github.com/user/repo.git', linux: 'git remote add origin git@github.com:user/repo.git\n# Or with HTTPS:\ngit remote add origin https://github.com/user/repo.git' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod9.s4.title', descKey: 'mod9.s4.desc',
          commands: { windows: 'git remote -v', mac: 'git remote -v', linux: 'git remote -v' },
          output: 'origin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod9.s5.title', descKey: 'mod9.s5.desc',
          commands: { windows: 'git push -u origin main', mac: 'git push -u origin main', linux: 'git push -u origin main' },
          output: 'Enumerating objects: 6, done.\nCounting objects: 100% (6/6), done.\nWriting objects: 100% (6/6), 512 bytes | 512.00 KiB/s, done.\nBranch main set up to track remote branch main from origin.', vscodeKey: null, tipKey: 'mod9.s5.tip', warningKey: null },
        { titleKey: 'mod9.s6.title', descKey: 'mod9.s6.desc',
          commands: { windows: 'ssh-keygen -t ed25519 -C "you@example.com"\n# Key saved to: C:\\Users\\you\\.ssh\\id_ed25519', mac: 'ssh-keygen -t ed25519 -C "you@example.com"\n# Key saved to: ~/.ssh/id_ed25519', linux: 'ssh-keygen -t ed25519 -C "you@example.com"\n# Key saved to: ~/.ssh/id_ed25519' },
          output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in /home/user/.ssh/id_ed25519\nYour public key has been saved in /home/user/.ssh/id_ed25519.pub', vscodeKey: null, tipKey: 'mod9.s6.tip', warningKey: null },
        { titleKey: 'mod9.s7.title', descKey: 'mod9.s7.desc',
          commands: { windows: 'cat ~/.ssh/id_ed25519.pub | clip', mac: 'pbcopy < ~/.ssh/id_ed25519.pub', linux: 'cat ~/.ssh/id_ed25519.pub' },
          output: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... you@example.com', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod9.s8.title', descKey: 'mod9.s8.desc',
          commands: { windows: 'git clone https://github.com/user/repo.git', mac: 'git clone https://github.com/user/repo.git', linux: 'git clone https://github.com/user/repo.git' },
          output: "Cloning into 'repo'...\nremote: Enumerating objects: 6, done.\nReceiving objects: 100% (6/6), done.", vscodeKey: 'mod9.s8.vscode', tipKey: null, warningKey: null }
    ]
},
{
    id: 10, titleKey: 'mod10.title', descKey: 'mod10.desc', level: 'intermediate', duration: 20,
    icon: 'fa-solid fa-users', gradient: 'linear-gradient(135deg, #e5534b, #f78166)',
    steps: [
        { titleKey: 'mod10.s1.title', descKey: 'mod10.s1.desc',
          commands: { windows: 'git clone https://github.com/user/project.git', mac: 'git clone https://github.com/user/project.git', linux: 'git clone https://github.com/user/project.git' },
          output: "Cloning into 'project'...\nReceiving objects: 100% (42/42), done.", vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod10.s2.title', descKey: 'mod10.s2.desc',
          commands: { windows: 'git fetch origin', mac: 'git fetch origin', linux: 'git fetch origin' },
          output: 'From https://github.com/user/project\n   a1b2c3d..d4e5f6a  main -> origin/main', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod10.s3.title', descKey: 'mod10.s3.desc',
          commands: { windows: 'git pull origin main', mac: 'git pull origin main', linux: 'git pull origin main' },
          output: 'Updating a1b2c3d..d4e5f6a\nFast-forward\n README.md | 2 ++\n 1 file changed, 2 insertions(+)', vscodeKey: null, tipKey: null, warningKey: 'mod10.s3.warning' },
        { titleKey: 'mod10.s4.title', descKey: 'mod10.s4.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod10.s5.title', descKey: 'mod10.s5.desc',
          commands: { windows: 'git push', mac: 'git push', linux: 'git push' },
          output: 'To https://github.com/user/project.git\n   d4e5f6a..f7g8h9i  main -> main', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod10.s6.title', descKey: 'mod10.s6.desc',
          commands: { windows: 'git branch -r\ngit branch --set-upstream-to=origin/main main', mac: 'git branch -r\ngit branch --set-upstream-to=origin/main main', linux: 'git branch -r\ngit branch --set-upstream-to=origin/main main' },
          output: 'origin/main\norigin/feature-api\nBranch main set up to track remote branch main from origin.', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod10.s7.title', descKey: 'mod10.s7.desc', commands: null, output: null, vscodeKey: 'mod10.s7.vscode', tipKey: null, warningKey: null }
    ]
},
{
    id: 11, titleKey: 'mod11.title', descKey: 'mod11.desc', level: 'intermediate', duration: 25,
    icon: 'fa-solid fa-triangle-exclamation', gradient: 'linear-gradient(135deg, #d29922, #e3b341)',
    steps: [
        { titleKey: 'mod11.s1.title', descKey: 'mod11.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod11.s2.title', descKey: 'mod11.s2.desc',
          commands: { windows: 'git switch -c branch-a\necho Version A > file.txt\ngit add . && git commit -m "Branch A change"\ngit switch main\ngit switch -c branch-b\necho Version B > file.txt\ngit add . && git commit -m "Branch B change"\ngit switch branch-a\ngit merge branch-b', mac: 'git switch -c branch-a\necho "Version A" > file.txt\ngit add . && git commit -m "Branch A change"\ngit switch main\ngit switch -c branch-b\necho "Version B" > file.txt\ngit add . && git commit -m "Branch B change"\ngit switch branch-a\ngit merge branch-b', linux: 'git switch -c branch-a\necho "Version A" > file.txt\ngit add . && git commit -m "Branch A change"\ngit switch main\ngit switch -c branch-b\necho "Version B" > file.txt\ngit add . && git commit -m "Branch B change"\ngit switch branch-a\ngit merge branch-b' },
          output: 'CONFLICT (content): Merge conflict in file.txt\nAutomatic merge failed; fix conflicts and then commit the result.', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod11.s3.title', descKey: 'mod11.s3.desc',
          commands: { windows: 'type file.txt', mac: 'cat file.txt', linux: 'cat file.txt' },
          output: '<<<<<<< HEAD\nVersion A\n=======\nVersion B\n>>>>>>> branch-b', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod11.s4.title', descKey: 'mod11.s4.desc',
          commands: { windows: '# Edit file.txt to resolve conflict\n# Remove markers, keep desired content\ngit add file.txt', mac: '# Edit file.txt to resolve conflict\n# Remove markers, keep desired content\ngit add file.txt', linux: '# Edit file.txt to resolve conflict\n# Remove markers, keep desired content\ngit add file.txt' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod11.s5.title', descKey: 'mod11.s5.desc', commands: null, output: null, vscodeKey: 'mod11.s5.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod11.s6.title', descKey: 'mod11.s6.desc',
          commands: { windows: 'git add file.txt\ngit commit -m "Resolve merge conflict"', mac: 'git add file.txt\ngit commit -m "Resolve merge conflict"', linux: 'git add file.txt\ngit commit -m "Resolve merge conflict"' },
          output: '[branch-a f1g2h3i] Resolve merge conflict', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod11.s7.title', descKey: 'mod11.s7.desc',
          commands: { windows: 'git merge --abort', mac: 'git merge --abort', linux: 'git merge --abort' },
          output: null, vscodeKey: null, tipKey: 'mod11.s7.tip', warningKey: null }
    ]
},
{
    id: 12, titleKey: 'mod12.title', descKey: 'mod12.desc', level: 'advanced', duration: 25,
    icon: 'fa-solid fa-arrows-rotate', gradient: 'linear-gradient(135deg, #4000A5, #2DD4BF)',
    steps: [
        { titleKey: 'mod12.s1.title', descKey: 'mod12.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod12.s2.title', descKey: 'mod12.s2.desc',
          commands: { windows: 'git switch feature-branch\ngit rebase main', mac: 'git switch feature-branch\ngit rebase main', linux: 'git switch feature-branch\ngit rebase main' },
          output: 'Successfully rebased and updated refs/heads/feature-branch.', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod12.s3.title', descKey: 'mod12.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod12.s4.title', descKey: 'mod12.s4.desc',
          commands: { windows: 'git rebase -i HEAD~3', mac: 'git rebase -i HEAD~3', linux: 'git rebase -i HEAD~3' },
          output: 'pick a1b2c3d First commit\npick d4e5f6a Second commit\npick g7h8i9j Third commit\n\n# Commands: p(pick), r(reword), e(edit), s(squash), f(fixup), d(drop)', vscodeKey: 'mod12.s4.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod12.s5.title', descKey: 'mod12.s5.desc',
          commands: { windows: '# Change pick to squash:\npick a1b2c3d First commit\nsquash d4e5f6a Second commit\nsquash g7h8i9j Third commit', mac: '# Change pick to squash:\npick a1b2c3d First commit\nsquash d4e5f6a Second commit\nsquash g7h8i9j Third commit', linux: '# Change pick to squash:\npick a1b2c3d First commit\nsquash d4e5f6a Second commit\nsquash g7h8i9j Third commit' },
          output: 'Successfully rebased and updated refs/heads/feature-branch.', vscodeKey: null, tipKey: 'mod12.s5.tip', warningKey: null },
        { titleKey: 'mod12.s6.title', descKey: 'mod12.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: 'mod12.s6.warning' },
        { titleKey: 'mod12.s7.title', descKey: 'mod12.s7.desc',
          commands: { windows: 'git rebase --abort', mac: 'git rebase --abort', linux: 'git rebase --abort' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 13, titleKey: 'mod13.title', descKey: 'mod13.desc', level: 'advanced', duration: 20,
    icon: 'fa-solid fa-box-archive', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    steps: [
        { titleKey: 'mod13.s1.title', descKey: 'mod13.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod13.s2.title', descKey: 'mod13.s2.desc',
          commands: { windows: 'git stash\n# or:\ngit stash push -m "WIP: login feature"', mac: 'git stash\n# or:\ngit stash push -m "WIP: login feature"', linux: 'git stash\n# or:\ngit stash push -m "WIP: login feature"' },
          output: 'Saved working directory and index state WIP on main: d4e5f6a Update README', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod13.s3.title', descKey: 'mod13.s3.desc',
          commands: { windows: 'git stash list', mac: 'git stash list', linux: 'git stash list' },
          output: 'stash@{0}: On main: WIP: login feature\nstash@{1}: WIP on main: a1b2c3d Initial commit', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod13.s4.title', descKey: 'mod13.s4.desc',
          commands: { windows: 'git stash pop\n# or keep stash:\ngit stash apply', mac: 'git stash pop\n# or keep stash:\ngit stash apply', linux: 'git stash pop\n# or keep stash:\ngit stash apply' },
          output: 'On branch main\nChanges not staged for commit:\n\tmodified:   login.js\nDropped refs/stash@{0}', vscodeKey: null, tipKey: 'mod13.s4.tip', warningKey: null },
        { titleKey: 'mod13.s5.title', descKey: 'mod13.s5.desc',
          commands: { windows: 'git stash drop stash@{0}', mac: 'git stash drop stash@{0}', linux: 'git stash drop stash@{0}' },
          output: 'Dropped stash@{0} (a1b2c3d...)', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod13.s6.title', descKey: 'mod13.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod13.s7.title', descKey: 'mod13.s7.desc',
          commands: { windows: 'git cherry-pick a1b2c3d', mac: 'git cherry-pick a1b2c3d', linux: 'git cherry-pick a1b2c3d' },
          output: '[main x9y8z7w] The cherry-picked commit message\n 1 file changed, 1 insertion(+)', vscodeKey: null, tipKey: 'mod13.s7.tip', warningKey: null }
    ]
},
{
    id: 14, titleKey: 'mod14.title', descKey: 'mod14.desc', level: 'advanced', duration: 25,
    icon: 'fa-solid fa-rotate-left', gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    steps: [
        { titleKey: 'mod14.s1.title', descKey: 'mod14.s1.desc',
          commands: { windows: 'git restore file.txt', mac: 'git restore file.txt', linux: 'git restore file.txt' },
          output: null, vscodeKey: null, tipKey: null, warningKey: 'mod14.s1.warning' },
        { titleKey: 'mod14.s2.title', descKey: 'mod14.s2.desc',
          commands: { windows: 'git restore --staged file.txt', mac: 'git restore --staged file.txt', linux: 'git restore --staged file.txt' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod14.s3.title', descKey: 'mod14.s3.desc',
          commands: { windows: 'git reset --soft HEAD~1', mac: 'git reset --soft HEAD~1', linux: 'git reset --soft HEAD~1' },
          output: null, vscodeKey: null, tipKey: 'mod14.s3.tip', warningKey: null },
        { titleKey: 'mod14.s4.title', descKey: 'mod14.s4.desc',
          commands: { windows: 'git reset HEAD~1', mac: 'git reset HEAD~1', linux: 'git reset HEAD~1' },
          output: 'Unstaged changes after reset:\nM\tfile.txt', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod14.s5.title', descKey: 'mod14.s5.desc',
          commands: { windows: 'git reset --hard HEAD~1', mac: 'git reset --hard HEAD~1', linux: 'git reset --hard HEAD~1' },
          output: 'HEAD is now at a1b2c3d Previous commit message', vscodeKey: null, tipKey: null, warningKey: 'mod14.s5.warning' },
        { titleKey: 'mod14.s6.title', descKey: 'mod14.s6.desc',
          commands: { windows: 'git revert d4e5f6a', mac: 'git revert d4e5f6a', linux: 'git revert d4e5f6a' },
          output: '[main r1s2t3u] Revert "Update README"\n 1 file changed, 1 deletion(-)', vscodeKey: null, tipKey: 'mod14.s6.tip', warningKey: null },
        { titleKey: 'mod14.s7.title', descKey: 'mod14.s7.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod14.s8.title', descKey: 'mod14.s8.desc',
          commands: { windows: 'git reflog', mac: 'git reflog', linux: 'git reflog' },
          output: 'a1b2c3d HEAD@{0}: reset: moving to HEAD~1\nd4e5f6a HEAD@{1}: commit: Update README\na1b2c3d HEAD@{2}: commit (initial): Initial commit', vscodeKey: null, tipKey: 'mod14.s8.tip', warningKey: null }
    ]
},
{
    id: 15, titleKey: 'mod15.title', descKey: 'mod15.desc', level: 'advanced', duration: 15,
    icon: 'fa-solid fa-tags', gradient: 'linear-gradient(135deg, #059669, #34d399)',
    steps: [
        { titleKey: 'mod15.s1.title', descKey: 'mod15.s1.desc',
          commands: { windows: 'echo node_modules/ > .gitignore\necho .env >> .gitignore\necho *.log >> .gitignore\necho dist/ >> .gitignore', mac: 'echo "node_modules/" > .gitignore\necho ".env" >> .gitignore\necho "*.log" >> .gitignore\necho "dist/" >> .gitignore', linux: 'echo "node_modules/" > .gitignore\necho ".env" >> .gitignore\necho "*.log" >> .gitignore\necho "dist/" >> .gitignore' },
          output: null, vscodeKey: null, tipKey: 'mod15.s1.tip', warningKey: null },
        { titleKey: 'mod15.s2.title', descKey: 'mod15.s2.desc',
          commands: { windows: 'git config --global core.excludesfile %USERPROFILE%\\.gitignore_global', mac: 'git config --global core.excludesfile ~/.gitignore_global', linux: 'git config --global core.excludesfile ~/.gitignore_global' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod15.s3.title', descKey: 'mod15.s3.desc',
          commands: { windows: 'git tag v1.0', mac: 'git tag v1.0', linux: 'git tag v1.0' },
          output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod15.s4.title', descKey: 'mod15.s4.desc',
          commands: { windows: 'git tag -a v1.0 -m "Version 1.0 Release"', mac: 'git tag -a v1.0 -m "Version 1.0 Release"', linux: 'git tag -a v1.0 -m "Version 1.0 Release"' },
          output: null, vscodeKey: null, tipKey: 'mod15.s4.tip', warningKey: null },
        { titleKey: 'mod15.s5.title', descKey: 'mod15.s5.desc',
          commands: { windows: 'git push --tags', mac: 'git push --tags', linux: 'git push --tags' },
          output: 'To https://github.com/user/repo.git\n * [new tag]  v1.0 -> v1.0', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod15.s6.title', descKey: 'mod15.s6.desc', commands: null, output: null, vscodeKey: 'mod15.s6.vscode', tipKey: null, warningKey: null }
    ]
},
{
    id: 16, titleKey: 'mod16.title', descKey: 'mod16.desc', level: 'advanced', duration: 20,
    icon: 'fa-solid fa-diagram-project', gradient: 'linear-gradient(135deg, #4000A5, #00C2FF)',
    steps: [
        { titleKey: 'mod16.s1.title', descKey: 'mod16.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod16.s2.title', descKey: 'mod16.s2.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod16.s3.title', descKey: 'mod16.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod16.s4.title', descKey: 'mod16.s4.desc',
          commands: { windows: 'git commit -m "feat(auth): add OAuth2 login"\ngit commit -m "fix(api): handle null response"\ngit commit -m "docs: update API documentation"', mac: 'git commit -m "feat(auth): add OAuth2 login"\ngit commit -m "fix(api): handle null response"\ngit commit -m "docs: update API documentation"', linux: 'git commit -m "feat(auth): add OAuth2 login"\ngit commit -m "fix(api): handle null response"\ngit commit -m "docs: update API documentation"' },
          output: null, vscodeKey: null, tipKey: 'mod16.s4.tip', warningKey: null },
        { titleKey: 'mod16.s5.title', descKey: 'mod16.s5.desc', commands: null, output: null, vscodeKey: 'mod16.s5.vscode', tipKey: null, warningKey: null },
        { titleKey: 'mod16.s6.title', descKey: 'mod16.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 17, titleKey: 'mod17.title', descKey: 'mod17.desc', level: 'intermediate', duration: 20,
    icon: 'fa-solid fa-location-dot', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    steps: [
        { titleKey: 'mod17.s1.title', descKey: 'mod17.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod17.s2.title', descKey: 'mod17.s2.desc', commands: { windows: 'git checkout a1b2c3d', mac: 'git checkout a1b2c3d', linux: 'git checkout a1b2c3d' }, output: 'Note: switching to \'a1b2c3d\'.\nYou are in \'detached HEAD\' state.', vscodeKey: null, tipKey: 'mod17.s2.tip', warningKey: null },
        { titleKey: 'mod17.s3.title', descKey: 'mod17.s3.desc', commands: { windows: 'git checkout HEAD^', mac: 'git checkout HEAD^', linux: 'git checkout HEAD^' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod17.s4.title', descKey: 'mod17.s4.desc', commands: { windows: 'git checkout HEAD~3', mac: 'git checkout HEAD~3', linux: 'git checkout HEAD~3' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod17.s5.title', descKey: 'mod17.s5.desc', commands: { windows: 'git branch -f main HEAD~3', mac: 'git branch -f main HEAD~3', linux: 'git branch -f main HEAD~3' }, output: null, vscodeKey: null, tipKey: null, warningKey: 'mod17.s5.warning' },
        { titleKey: 'mod17.s6.title', descKey: 'mod17.s6.desc', commands: { windows: 'git log --oneline --graph --all\ngit show HEAD~2', mac: 'git log --oneline --graph --all\ngit show HEAD~2', linux: 'git log --oneline --graph --all\ngit show HEAD~2' }, output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 18, titleKey: 'mod18.title', descKey: 'mod18.desc', level: 'advanced', duration: 25,
    icon: 'fa-solid fa-list-check', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    steps: [
        { titleKey: 'mod18.s1.title', descKey: 'mod18.s1.desc', commands: { windows: 'git rebase -i HEAD~4', mac: 'git rebase -i HEAD~4', linux: 'git rebase -i HEAD~4' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod18.s2.title', descKey: 'mod18.s2.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod18.s3.title', descKey: 'mod18.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod18.s4.title', descKey: 'mod18.s4.desc', commands: { windows: 'git commit --amend\ngit rebase --continue', mac: 'git commit --amend\ngit rebase --continue', linux: 'git commit --amend\ngit rebase --continue' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod18.s5.title', descKey: 'mod18.s5.desc', commands: { windows: 'git reset HEAD^\ngit add file1.txt\ngit commit -m "part 1"\ngit add file2.txt\ngit commit -m "part 2"\ngit rebase --continue', mac: 'git reset HEAD^\ngit add file1.txt\ngit commit -m "part 1"\ngit add file2.txt\ngit commit -m "part 2"\ngit rebase --continue', linux: 'git reset HEAD^\ngit add file1.txt\ngit commit -m "part 1"\ngit add file2.txt\ngit commit -m "part 2"\ngit rebase --continue' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod18.s6.title', descKey: 'mod18.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: 'mod18.s6.warning' },
        { titleKey: 'mod18.s7.title', descKey: 'mod18.s7.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 19, titleKey: 'mod19.title', descKey: 'mod19.desc', level: 'advanced', duration: 20,
    icon: 'fa-solid fa-robot', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    steps: [
        { titleKey: 'mod19.s1.title', descKey: 'mod19.s1.desc', commands: { windows: 'ls .git\\hooks\\', mac: 'ls .git/hooks/', linux: 'ls .git/hooks/' }, output: 'applypatch-msg.sample  pre-commit.sample\ncommit-msg.sample      pre-push.sample\npost-update.sample     pre-rebase.sample', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod19.s2.title', descKey: 'mod19.s2.desc', commands: { windows: 'type nul > .git\\hooks\\pre-commit', mac: 'chmod +x .git/hooks/pre-commit', linux: 'chmod +x .git/hooks/pre-commit' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod19.s3.title', descKey: 'mod19.s3.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod19.s4.title', descKey: 'mod19.s4.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod19.s5.title', descKey: 'mod19.s5.desc', commands: { windows: 'npx husky init', mac: 'npx husky init', linux: 'npx husky init' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod19.s6.title', descKey: 'mod19.s6.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 20, titleKey: 'mod20.title', descKey: 'mod20.desc', level: 'advanced', duration: 25,
    icon: 'fa-solid fa-tower-broadcast', gradient: 'linear-gradient(135deg, #8B5CF6, #a78bfa)',
    steps: [
        { titleKey: 'mod20.s1.title', descKey: 'mod20.s1.desc', commands: { windows: 'git branch -r', mac: 'git branch -r', linux: 'git branch -r' }, output: '  origin/main\n  origin/feature', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod20.s2.title', descKey: 'mod20.s2.desc', commands: { windows: 'git push -u origin feature\ngit branch -u origin/main', mac: 'git push -u origin feature\ngit branch -u origin/main', linux: 'git push -u origin feature\ngit branch -u origin/main' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod20.s3.title', descKey: 'mod20.s3.desc', commands: { windows: 'git push origin main:production', mac: 'git push origin main:production', linux: 'git push origin main:production' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod20.s4.title', descKey: 'mod20.s4.desc', commands: { windows: 'git fetch origin main', mac: 'git fetch origin main', linux: 'git fetch origin main' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod20.s5.title', descKey: 'mod20.s5.desc', commands: { windows: 'git pull --rebase origin main', mac: 'git pull --rebase origin main', linux: 'git pull --rebase origin main' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod20.s6.title', descKey: 'mod20.s6.desc', commands: { windows: 'git push --force-with-lease', mac: 'git push --force-with-lease', linux: 'git push --force-with-lease' }, output: null, vscodeKey: null, tipKey: null, warningKey: 'mod20.s6.warning' },
        { titleKey: 'mod20.s7.title', descKey: 'mod20.s7.desc', commands: { windows: 'git remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit merge upstream/main', mac: 'git remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit merge upstream/main', linux: 'git remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit merge upstream/main' }, output: null, vscodeKey: null, tipKey: null, warningKey: null }
    ]
},
{
    id: 21, titleKey: 'mod21.title', descKey: 'mod21.desc', level: 'advanced', duration: 20,
    icon: 'fa-solid fa-bug', gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    steps: [
        { titleKey: 'mod21.s1.title', descKey: 'mod21.s1.desc', commands: null, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod21.s2.title', descKey: 'mod21.s2.desc', commands: { windows: 'git bisect start\ngit bisect bad\ngit bisect good a1b2c3d', mac: 'git bisect start\ngit bisect bad\ngit bisect good a1b2c3d', linux: 'git bisect start\ngit bisect bad\ngit bisect good a1b2c3d' }, output: 'Bisecting: 5 revisions left to test after this (roughly 3 steps)', vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod21.s3.title', descKey: 'mod21.s3.desc', commands: { windows: 'git bisect good\ngit bisect bad', mac: 'git bisect good\ngit bisect bad', linux: 'git bisect good\ngit bisect bad' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod21.s4.title', descKey: 'mod21.s4.desc', commands: { windows: 'git bisect reset', mac: 'git bisect reset', linux: 'git bisect reset' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod21.s5.title', descKey: 'mod21.s5.desc', commands: { windows: 'git bisect start\ngit bisect bad\ngit bisect good HEAD~20\ngit bisect run npm test', mac: 'git bisect start\ngit bisect bad\ngit bisect good HEAD~20\ngit bisect run npm test', linux: 'git bisect start\ngit bisect bad\ngit bisect good HEAD~20\ngit bisect run npm test' }, output: null, vscodeKey: null, tipKey: null, warningKey: null },
        { titleKey: 'mod21.s6.title', descKey: 'mod21.s6.desc', commands: { windows: 'git blame src\\app.js', mac: 'git blame src/app.js', linux: 'git blame src/app.js' }, output: 'a1b2c3d (Dr. Arafah 2026-01-15 09:30) function init() {\nf4e5d6c (Ahmad     2026-02-20 14:15)   setupDB();\n7a8b9c0 (Dr. Arafah 2026-03-10 11:45)   loadConfig();', vscodeKey: 'mod21.s6.vscode', tipKey: null, warningKey: null }
    ]
}
];

// ==================== CHEAT SHEET DATA ====================
const cheatSheetData = [
  {
    categoryKey: 'cheat.cat.setup', gradient: 'linear-gradient(135deg, #4000A5, #00C2FF)', icon: 'fa-solid fa-gear',
    commands: [
      { cmd: 'git config --global user.name "Name"', descKey: 'cheat.config.name' },
      { cmd: 'git config --global user.email "email"', descKey: 'cheat.config.email' },
      { cmd: 'git config --global init.defaultBranch main', descKey: 'cheat.config.defaultbranch' },
      { cmd: 'git config --global core.editor "code --wait"', descKey: 'cheat.config.editor' },
      { cmd: 'git config --list', descKey: 'cheat.config.list' },
      { cmd: 'git config --global color.ui auto', descKey: 'cheat.config.color' }
    ]
  },
  {
    categoryKey: 'cheat.cat.creating', gradient: 'linear-gradient(135deg, #10b981, #34d399)', icon: 'fa-solid fa-folder-plus',
    commands: [
      { cmd: 'git init', descKey: 'cheat.init' },
      { cmd: 'git clone <url>', descKey: 'cheat.clone' },
      { cmd: 'git clone -b <branch> <url>', descKey: 'cheat.clone.branch' },
      { cmd: 'git clone --depth 1 <url>', descKey: 'cheat.clone.shallow' }
    ]
  },
  {
    categoryKey: 'cheat.cat.basic', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', icon: 'fa-solid fa-cube',
    commands: [
      { cmd: 'git status', descKey: 'cheat.status' },
      { cmd: 'git add <file>', descKey: 'cheat.add.file' },
      { cmd: 'git add .', descKey: 'cheat.add.all' },
      { cmd: 'git commit -m "message"', descKey: 'cheat.commit' },
      { cmd: 'git commit --amend', descKey: 'cheat.commit.amend' },
      { cmd: 'git diff', descKey: 'cheat.diff' },
      { cmd: 'git diff --staged', descKey: 'cheat.diff.staged' }
    ]
  },
  {
    categoryKey: 'cheat.cat.branching', gradient: 'linear-gradient(135deg, #6E33D6, #a78bfa)', icon: 'fa-solid fa-code-branch',
    commands: [
      { cmd: 'git branch', descKey: 'cheat.branch.list' },
      { cmd: 'git branch <name>', descKey: 'cheat.branch.create' },
      { cmd: 'git switch <branch>', descKey: 'cheat.switch' },
      { cmd: 'git switch -c <branch>', descKey: 'cheat.switch.create' },
      { cmd: 'git branch -d <branch>', descKey: 'cheat.branch.delete' },
      { cmd: 'git branch -D <branch>', descKey: 'cheat.branch.deleteforce' },
      { cmd: 'git branch -a', descKey: 'cheat.branch.remote' }
    ]
  },
  {
    categoryKey: 'cheat.cat.merging', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', icon: 'fa-solid fa-code-merge',
    commands: [
      { cmd: 'git merge <branch>', descKey: 'cheat.merge' },
      { cmd: 'git merge --no-ff <branch>', descKey: 'cheat.merge.noff' },
      { cmd: 'git merge --abort', descKey: 'cheat.merge.abort' },
      { cmd: 'git rebase <branch>', descKey: 'cheat.rebase' },
      { cmd: 'git rebase -i HEAD~n', descKey: 'cheat.rebase.interactive' },
      { cmd: 'git cherry-pick <hash>', descKey: 'cheat.cherrypick' }
    ]
  },
  {
    categoryKey: 'cheat.cat.remote', gradient: 'linear-gradient(135deg, #00C2FF, #2DD4BF)', icon: 'fa-solid fa-cloud',
    commands: [
      { cmd: 'git remote add origin <url>', descKey: 'cheat.remote.add' },
      { cmd: 'git remote -v', descKey: 'cheat.remote.list' },
      { cmd: 'git push -u origin <branch>', descKey: 'cheat.push.upstream' },
      { cmd: 'git push', descKey: 'cheat.push' },
      { cmd: 'git pull', descKey: 'cheat.pull' },
      { cmd: 'git fetch', descKey: 'cheat.fetch' },
      { cmd: 'git push --tags', descKey: 'cheat.push.tags' }
    ]
  },
  {
    categoryKey: 'cheat.cat.inspection', gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', icon: 'fa-solid fa-magnifying-glass',
    commands: [
      { cmd: 'git log', descKey: 'cheat.log' },
      { cmd: 'git log --oneline --graph', descKey: 'cheat.log.oneline' },
      { cmd: 'git show <hash>', descKey: 'cheat.show' },
      { cmd: 'git blame <file>', descKey: 'cheat.blame' },
      { cmd: 'git reflog', descKey: 'cheat.reflog' }
    ]
  },
  {
    categoryKey: 'cheat.cat.undoing', gradient: 'linear-gradient(135deg, #ef4444, #f87171)', icon: 'fa-solid fa-rotate-left',
    commands: [
      { cmd: 'git restore <file>', descKey: 'cheat.restore' },
      { cmd: 'git restore --staged <file>', descKey: 'cheat.restore.staged' },
      { cmd: 'git reset --soft HEAD~1', descKey: 'cheat.reset.soft' },
      { cmd: 'git reset --hard HEAD~1', descKey: 'cheat.reset.hard' },
      { cmd: 'git revert <hash>', descKey: 'cheat.revert' },
      { cmd: 'git stash', descKey: 'cheat.stash' },
      { cmd: 'git stash pop', descKey: 'cheat.stash.pop' }
    ]
  },
  {
    categoryKey: 'cheat.cat.navigation', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)', icon: 'fa-solid fa-compass',
    commands: [
      { cmd: 'git checkout <commit-hash>', descKey: 'cheat.nav.detach' },
      { cmd: 'git checkout HEAD^', descKey: 'cheat.nav.parent' },
      { cmd: 'git checkout HEAD~3', descKey: 'cheat.nav.headBack' },
      { cmd: 'git branch -f main HEAD~2', descKey: 'cheat.nav.forceMove' },
      { cmd: 'git describe --tags', descKey: 'cheat.nav.describe' },
      { cmd: 'git log --graph --oneline --all', descKey: 'cheat.nav.graph' }
    ]
  },
  {
    categoryKey: 'cheat.cat.hooks', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', icon: 'fa-solid fa-bolt',
    commands: [
      { cmd: 'ls .git/hooks/', descKey: 'cheat.hooks.list' },
      { cmd: 'chmod +x .git/hooks/pre-commit', descKey: 'cheat.hooks.chmod' },
      { cmd: 'npx husky init', descKey: 'cheat.hooks.huskyInit' },
      { cmd: 'npx husky add .husky/pre-commit "npm test"', descKey: 'cheat.hooks.huskyAdd' },
      { cmd: 'git commit --no-verify', descKey: 'cheat.hooks.skip' }
    ]
  },
  {
    categoryKey: 'cheat.cat.debugging', gradient: 'linear-gradient(135deg, #ef4444, #f87171)', icon: 'fa-solid fa-bug',
    commands: [
      { cmd: 'git bisect start', descKey: 'cheat.debug.start' },
      { cmd: 'git bisect bad', descKey: 'cheat.debug.bad' },
      { cmd: 'git bisect good <commit>', descKey: 'cheat.debug.good' },
      { cmd: 'git bisect reset', descKey: 'cheat.debug.reset' },
      { cmd: 'git bisect run <script>', descKey: 'cheat.debug.run' },
      { cmd: 'git blame <file>', descKey: 'cheat.debug.blame' }
    ]
  },
  {
    categoryKey: 'cheat.cat.advanced', gradient: 'linear-gradient(135deg, #8B5CF6, #a78bfa)', icon: 'fa-solid fa-wand-magic-sparkles',
    commands: [
      { cmd: 'git rebase -i HEAD~4', descKey: 'cheat.adv.rebaseInteractive' },
      { cmd: 'git commit --amend', descKey: 'cheat.adv.amend' },
      { cmd: 'git push --force-with-lease', descKey: 'cheat.adv.forceLease' },
      { cmd: 'git push origin main:production', descKey: 'cheat.adv.pushDiffBranch' },
      { cmd: 'git remote add upstream <url>', descKey: 'cheat.adv.addUpstream' },
      { cmd: 'git fetch upstream', descKey: 'cheat.adv.fetchUpstream' },
      { cmd: 'git worktree add ../feature feature-branch', descKey: 'cheat.adv.worktree' }
    ]
  }
];

// ==================== QUIZ DATA ====================
const quizzes = {
  beginner: [
    { questionKey: 'quiz.b1.q', optionKeys: ['quiz.b1.o1','quiz.b1.o2','quiz.b1.o3','quiz.b1.o4'], correct: 1, explanationKey: 'quiz.b1.explain' },
    { questionKey: 'quiz.b2.q', optionKeys: ['quiz.b2.o1','quiz.b2.o2','quiz.b2.o3','quiz.b2.o4'], correct: 2, explanationKey: 'quiz.b2.explain' },
    { questionKey: 'quiz.b3.q', optionKeys: ['quiz.b3.o1','quiz.b3.o2','quiz.b3.o3','quiz.b3.o4'], correct: 2, explanationKey: 'quiz.b3.explain' },
    { questionKey: 'quiz.b4.q', optionKeys: ['quiz.b4.o1','quiz.b4.o2','quiz.b4.o3','quiz.b4.o4'], correct: 1, explanationKey: 'quiz.b4.explain' },
    { questionKey: 'quiz.b5.q', optionKeys: ['quiz.b5.o1','quiz.b5.o2','quiz.b5.o3','quiz.b5.o4'], correct: 1, explanationKey: 'quiz.b5.explain' },
    { questionKey: 'quiz.b6.q', optionKeys: ['quiz.b6.o1','quiz.b6.o2','quiz.b6.o3','quiz.b6.o4'], correct: 1, explanationKey: 'quiz.b6.explain' },
    { questionKey: 'quiz.b7.q', optionKeys: ['quiz.b7.o1','quiz.b7.o2','quiz.b7.o3','quiz.b7.o4'], correct: 2, explanationKey: 'quiz.b7.explain' },
    { questionKey: 'quiz.b8.q', optionKeys: ['quiz.b8.o1','quiz.b8.o2','quiz.b8.o3','quiz.b8.o4'], correct: 1, explanationKey: 'quiz.b8.explain' },
    { questionKey: 'quiz.b9.q', optionKeys: ['quiz.b9.o1','quiz.b9.o2','quiz.b9.o3','quiz.b9.o4'], correct: 2, explanationKey: 'quiz.b9.explain' },
    { questionKey: 'quiz.b10.q', optionKeys: ['quiz.b10.o1','quiz.b10.o2','quiz.b10.o3','quiz.b10.o4'], correct: 1, explanationKey: 'quiz.b10.explain' },
    { questionKey: 'quiz.b11.q', optionKeys: ['quiz.b11.o1','quiz.b11.o2','quiz.b11.o3','quiz.b11.o4'], correct: 3, explanationKey: 'quiz.b11.explain' },
    { questionKey: 'quiz.b12.q', optionKeys: ['quiz.b12.o1','quiz.b12.o2','quiz.b12.o3','quiz.b12.o4'], correct: 1, explanationKey: 'quiz.b12.explain' }
  ],
  intermediate: [
    { questionKey: 'quiz.i1.q', optionKeys: ['quiz.i1.o1','quiz.i1.o2','quiz.i1.o3','quiz.i1.o4'], correct: 1, explanationKey: 'quiz.i1.explain' },
    { questionKey: 'quiz.i2.q', optionKeys: ['quiz.i2.o1','quiz.i2.o2','quiz.i2.o3','quiz.i2.o4'], correct: 1, explanationKey: 'quiz.i2.explain' },
    { questionKey: 'quiz.i3.q', optionKeys: ['quiz.i3.o1','quiz.i3.o2','quiz.i3.o3','quiz.i3.o4'], correct: 2, explanationKey: 'quiz.i3.explain' },
    { questionKey: 'quiz.i4.q', optionKeys: ['quiz.i4.o1','quiz.i4.o2','quiz.i4.o3','quiz.i4.o4'], correct: 1, explanationKey: 'quiz.i4.explain' },
    { questionKey: 'quiz.i5.q', optionKeys: ['quiz.i5.o1','quiz.i5.o2','quiz.i5.o3','quiz.i5.o4'], correct: 1, explanationKey: 'quiz.i5.explain' },
    { questionKey: 'quiz.i6.q', optionKeys: ['quiz.i6.o1','quiz.i6.o2','quiz.i6.o3','quiz.i6.o4'], correct: 1, explanationKey: 'quiz.i6.explain' },
    { questionKey: 'quiz.i7.q', optionKeys: ['quiz.i7.o1','quiz.i7.o2','quiz.i7.o3','quiz.i7.o4'], correct: 1, explanationKey: 'quiz.i7.explain' },
    { questionKey: 'quiz.i8.q', optionKeys: ['quiz.i8.o1','quiz.i8.o2','quiz.i8.o3','quiz.i8.o4'], correct: 2, explanationKey: 'quiz.i8.explain' },
    { questionKey: 'quiz.i9.q', optionKeys: ['quiz.i9.o1','quiz.i9.o2','quiz.i9.o3','quiz.i9.o4'], correct: 1, explanationKey: 'quiz.i9.explain' },
    { questionKey: 'quiz.i10.q', optionKeys: ['quiz.i10.o1','quiz.i10.o2','quiz.i10.o3','quiz.i10.o4'], correct: 3, explanationKey: 'quiz.i10.explain' },
    { questionKey: 'quiz.i11.q', optionKeys: ['quiz.i11.o1','quiz.i11.o2','quiz.i11.o3','quiz.i11.o4'], correct: 1, explanationKey: 'quiz.i11.explain' },
    { questionKey: 'quiz.i12.q', optionKeys: ['quiz.i12.o1','quiz.i12.o2','quiz.i12.o3','quiz.i12.o4'], correct: 1, explanationKey: 'quiz.i12.explain' }
  ],
  advanced: [
    { questionKey: 'quiz.a1.q', optionKeys: ['quiz.a1.o1','quiz.a1.o2','quiz.a1.o3','quiz.a1.o4'], correct: 1, explanationKey: 'quiz.a1.explain' },
    { questionKey: 'quiz.a2.q', optionKeys: ['quiz.a2.o1','quiz.a2.o2','quiz.a2.o3','quiz.a2.o4'], correct: 1, explanationKey: 'quiz.a2.explain' },
    { questionKey: 'quiz.a3.q', optionKeys: ['quiz.a3.o1','quiz.a3.o2','quiz.a3.o3','quiz.a3.o4'], correct: 1, explanationKey: 'quiz.a3.explain' },
    { questionKey: 'quiz.a4.q', optionKeys: ['quiz.a4.o1','quiz.a4.o2','quiz.a4.o3','quiz.a4.o4'], correct: 1, explanationKey: 'quiz.a4.explain' },
    { questionKey: 'quiz.a5.q', optionKeys: ['quiz.a5.o1','quiz.a5.o2','quiz.a5.o3','quiz.a5.o4'], correct: 1, explanationKey: 'quiz.a5.explain' },
    { questionKey: 'quiz.a6.q', optionKeys: ['quiz.a6.o1','quiz.a6.o2','quiz.a6.o3','quiz.a6.o4'], correct: 1, explanationKey: 'quiz.a6.explain' },
    { questionKey: 'quiz.a7.q', optionKeys: ['quiz.a7.o1','quiz.a7.o2','quiz.a7.o3','quiz.a7.o4'], correct: 1, explanationKey: 'quiz.a7.explain' },
    { questionKey: 'quiz.a8.q', optionKeys: ['quiz.a8.o1','quiz.a8.o2','quiz.a8.o3','quiz.a8.o4'], correct: 1, explanationKey: 'quiz.a8.explain' },
    { questionKey: 'quiz.a9.q', optionKeys: ['quiz.a9.o1','quiz.a9.o2','quiz.a9.o3','quiz.a9.o4'], correct: 1, explanationKey: 'quiz.a9.explain' },
    { questionKey: 'quiz.a10.q', optionKeys: ['quiz.a10.o1','quiz.a10.o2','quiz.a10.o3','quiz.a10.o4'], correct: 1, explanationKey: 'quiz.a10.explain' },
    { questionKey: 'quiz.a11.q', optionKeys: ['quiz.a11.o1','quiz.a11.o2','quiz.a11.o3','quiz.a11.o4'], correct: 1, explanationKey: 'quiz.a11.explain' },
    { questionKey: 'quiz.a12.q', optionKeys: ['quiz.a12.o1','quiz.a12.o2','quiz.a12.o3','quiz.a12.o4'], correct: 1, explanationKey: 'quiz.a12.explain' },
    { questionKey: 'quiz.a13.q', optionKeys: ['quiz.a13.o1','quiz.a13.o2','quiz.a13.o3','quiz.a13.o4'], correct: 1, explanationKey: 'quiz.a13.explain' },
    { questionKey: 'quiz.a14.q', optionKeys: ['quiz.a14.o1','quiz.a14.o2','quiz.a14.o3','quiz.a14.o4'], correct: 1, explanationKey: 'quiz.a14.explain' }
  ]
};

// ==================== PROGRESS TRACKING ====================
const progress = {
  save(moduleId, stepIndex) {
    const data = JSON.parse(localStorage.getItem('gitmaster-progress') || '{}');
    if (!data[moduleId] || stepIndex > data[moduleId]) data[moduleId] = stepIndex;
    localStorage.setItem('gitmaster-progress', JSON.stringify(data));
  },
  get(moduleId) {
    return (JSON.parse(localStorage.getItem('gitmaster-progress') || '{}'))[moduleId] || 0;
  },
  getAll() { return JSON.parse(localStorage.getItem('gitmaster-progress') || '{}'); },
  isCompleted(moduleId) {
    const mod = modules.find(m => m.id === moduleId);
    return mod ? this.get(moduleId) >= mod.steps.length : false;
  },
  getOverallPercent() {
    const totalSteps = modules.reduce((s, m) => s + m.steps.length, 0);
    const done = modules.reduce((s, m) => s + Math.min(this.get(m.id), m.steps.length), 0);
    return totalSteps > 0 ? Math.round((done / totalSteps) * 100) : 0;
  },
  reset() { localStorage.removeItem('gitmaster-progress'); }
};

// ==================== TERMINAL SIMULATOR ====================
let terminalState = {
  initialized: false, branch: 'main', branches: ['main'],
  commits: [], staged: [], untracked: [], modified: [],
  files: {}, remotes: {}, stash: [], tags: [],
  commandHistory: [], historyIndex: -1
};

function processCommand(input) {
  const cmd = input.trim();
  if (!cmd) return '';
  terminalState.commandHistory.push(cmd);
  terminalState.historyIndex = terminalState.commandHistory.length;

  if (cmd === 'help') {
    return '<span class="terminal-info">Available commands:</span>\n' +
      '  git init, git status, git add, git commit\n' +
      '  git log, git log --oneline, git diff\n' +
      '  git branch, git switch, git checkout\n' +
      '  git merge, git rebase, git cherry-pick\n' +
      '  git remote, git push, git pull, git clone\n' +
      '  git stash, git stash pop, git stash list\n' +
      '  git tag, git reset, git revert, git reflog\n' +
      '  git blame, git show, git config\n' +
      '  touch, echo, ls, cat, mkdir, pwd, clear\n\n' +
      '<span class="terminal-info">Tips:</span>\n' +
      '  Press <span class="terminal-output">Tab</span> for auto-completion\n' +
      '  Press <span class="terminal-output">↑/↓</span> to navigate command history\n' +
      '  Type <span class="terminal-output">git</span> to see all available subcommands\n' +
      '  Common typos and mistakes are automatically detected';
  }
  if (cmd === 'clear') return '__CLEAR__';
  if (cmd === 'pwd') return '/home/user/my-project';

  if (cmd.startsWith('touch ')) {
    const fname = cmd.substring(6).trim();
    if (!fname) return '<span class="terminal-error">touch: missing file operand</span>';
    terminalState.files[fname] = '';
    if (terminalState.initialized && !terminalState.staged.includes(fname) && !terminalState.untracked.includes(fname))
      terminalState.untracked.push(fname);
    return '';
  }

  const echoMatch = cmd.match(/^echo\s+["'](.*)["']\s*>\s*(\S+)$/);
  if (echoMatch) {
    const content = echoMatch[1], fname = echoMatch[2];
    const isNew = !terminalState.files[fname];
    terminalState.files[fname] = content;
    if (terminalState.initialized) {
      if (isNew && !terminalState.untracked.includes(fname)) terminalState.untracked.push(fname);
      else if (!isNew && !terminalState.modified.includes(fname) && !terminalState.untracked.includes(fname)) terminalState.modified.push(fname);
    }
    return '';
  }
  const echoAppend = cmd.match(/^echo\s+["'](.*)["']\s*>>\s*(\S+)$/);
  if (echoAppend) {
    const content = echoAppend[1], fname = echoAppend[2];
    const isNew = !terminalState.files[fname];
    terminalState.files[fname] = (terminalState.files[fname] || '') + '\n' + content;
    if (terminalState.initialized) {
      if (isNew && !terminalState.untracked.includes(fname)) terminalState.untracked.push(fname);
      else if (!isNew && !terminalState.modified.includes(fname) && !terminalState.untracked.includes(fname)) terminalState.modified.push(fname);
    }
    return '';
  }

  if (cmd === 'ls' || cmd === 'ls -la') {
    const names = Object.keys(terminalState.files);
    if (terminalState.initialized) names.unshift('.git/');
    return names.length > 0 ? names.join('  ') : '';
  }

  if (cmd.startsWith('cat ')) {
    const fname = cmd.substring(4).trim();
    if (terminalState.files[fname] !== undefined) return escapeHtml(terminalState.files[fname] || '');
    return '<span class="terminal-error">cat: ' + fname + ': No such file or directory</span>';
  }

  if (cmd.startsWith('mkdir ')) {
    const dname = cmd.substring(6).trim();
    if (!dname) return '<span class="terminal-error">mkdir: missing operand</span>';
    terminalState.files[dname + '/'] = null;
    return '';
  }

  // Git commands
  if (cmd === 'git init') {
    if (terminalState.initialized) return '<span class="terminal-warning">Reinitialized existing Git repository</span>';
    terminalState.initialized = true;
    terminalState.branch = 'main';
    terminalState.branches = ['main'];
    Object.keys(terminalState.files).forEach(f => { if (!terminalState.untracked.includes(f) && terminalState.files[f] !== null) terminalState.untracked.push(f); });
    return '<span class="terminal-output">Initialized empty Git repository in /home/user/my-project/.git/</span>';
  }

  if (!terminalState.initialized && cmd.startsWith('git ') && !cmd.startsWith('git clone') && !cmd.startsWith('git --version') && !cmd.startsWith('git config'))
    return '<span class="terminal-error">fatal: not a git repository (or any of the parent directories): .git</span>';

  if (cmd === 'git --version') return 'git version 2.43.0';
  if (cmd.startsWith('git config')) {
    if (cmd.includes('--list')) return 'user.name=Your Name\nuser.email=you@example.com\ninit.defaultbranch=main\ncore.editor=code --wait\ncolor.ui=auto';
    return '';
  }

  if (cmd === 'git status') {
    let out = 'On branch ' + terminalState.branch + '\n';
    if (terminalState.commits.length === 0) out += '\nNo commits yet\n';
    if (terminalState.staged.length > 0) {
      out += '\n<span class="terminal-output">Changes to be committed:</span>\n';
      terminalState.staged.forEach(f => out += '  <span class="terminal-output">new file:   ' + f + '</span>\n');
    }
    if (terminalState.modified.length > 0) {
      out += '\n<span class="terminal-error">Changes not staged for commit:</span>\n';
      terminalState.modified.forEach(f => out += '  <span class="terminal-error">modified:   ' + f + '</span>\n');
    }
    if (terminalState.untracked.length > 0) {
      out += '\n<span class="terminal-error">Untracked files:</span>\n';
      terminalState.untracked.forEach(f => out += '  <span class="terminal-error">' + f + '</span>\n');
    }
    if (!terminalState.staged.length && !terminalState.modified.length && !terminalState.untracked.length)
      out += 'nothing to commit, working tree clean';
    return out.trim();
  }

  if (cmd === 'git add .' || cmd === 'git add -A') {
    terminalState.staged.push(...terminalState.untracked, ...terminalState.modified);
    terminalState.untracked = []; terminalState.modified = [];
    return '';
  }
  if (cmd.startsWith('git add ')) {
    const fname = cmd.substring(8).trim();
    let idx = terminalState.untracked.indexOf(fname);
    if (idx >= 0) { terminalState.untracked.splice(idx, 1); terminalState.staged.push(fname); return ''; }
    idx = terminalState.modified.indexOf(fname);
    if (idx >= 0) { terminalState.modified.splice(idx, 1); terminalState.staged.push(fname); return ''; }
    if (terminalState.files[fname] !== undefined) return '';
    return '<span class="terminal-error">fatal: pathspec \'' + fname + '\' did not match any files</span>';
  }

  const commitMatch = cmd.match(/^git commit -m ["'](.+)["']$/);
  if (commitMatch) {
    if (terminalState.staged.length === 0) return '<span class="terminal-error">nothing to commit, working tree clean</span>';
    const msg = commitMatch[1], hash = generateHash();
    const count = terminalState.staged.length, isRoot = terminalState.commits.length === 0;
    terminalState.commits.push({ hash, message: msg, branch: terminalState.branch, files: [...terminalState.staged] });
    terminalState.staged = [];
    return '<span class="terminal-output">[' + terminalState.branch + (isRoot ? ' (root-commit) ' : ' ') + hash + '] ' + escapeHtml(msg) + '\n ' + count + ' file(s) changed</span>';
  }

  if (cmd === 'git log') {
    if (terminalState.commits.length === 0) return '<span class="terminal-error">fatal: your current branch does not have any commits yet</span>';
    return terminalState.commits.slice().reverse().map(c =>
      '<span class="terminal-info">commit ' + c.hash + '</span> (HEAD -> ' + c.branch + ')\nAuthor: Your Name &lt;you@example.com&gt;\n\n    ' + escapeHtml(c.message)
    ).join('\n\n');
  }
  if (cmd === 'git log --oneline' || cmd.startsWith('git log --oneline')) {
    if (terminalState.commits.length === 0) return '<span class="terminal-error">fatal: no commits yet</span>';
    return terminalState.commits.slice().reverse().map((c, i) =>
      '<span class="terminal-info">' + c.hash + '</span>' + (i === 0 ? ' <span class="terminal-output">(HEAD -> ' + terminalState.branch + ')</span>' : '') + ' ' + escapeHtml(c.message)
    ).join('\n');
  }

  if (cmd === 'git branch') return terminalState.branches.map(b => (b === terminalState.branch ? '* <span class="terminal-output">' + b + '</span>' : '  ' + b)).join('\n');
  if (cmd === 'git branch -a' || cmd === 'git branch -r') {
    let out = terminalState.branches.map(b => (b === terminalState.branch ? '* <span class="terminal-output">' + b + '</span>' : '  ' + b)).join('\n');
    Object.keys(terminalState.remotes).forEach(r => out += '\n  <span class="terminal-error">remotes/' + r + '/main</span>');
    return out;
  }

  const branchCreate = cmd.match(/^git branch ([a-zA-Z0-9_\-\/]+)$/);
  if (branchCreate) {
    const name = branchCreate[1];
    if (terminalState.branches.includes(name)) return '<span class="terminal-error">fatal: branch \'' + name + '\' already exists</span>';
    terminalState.branches.push(name);
    return '';
  }
  const branchDel = cmd.match(/^git branch -[dD] (\S+)$/);
  if (branchDel) {
    const name = branchDel[1];
    if (name === terminalState.branch) return '<span class="terminal-error">error: Cannot delete the checked out branch</span>';
    const idx = terminalState.branches.indexOf(name);
    if (idx < 0) return '<span class="terminal-error">error: branch \'' + name + '\' not found</span>';
    terminalState.branches.splice(idx, 1);
    return '<span class="terminal-output">Deleted branch ' + name + '.</span>';
  }

  const switchMatch = cmd.match(/^git (?:switch|checkout) ([a-zA-Z0-9_\-\/]+)$/);
  if (switchMatch) {
    const name = switchMatch[1];
    if (!terminalState.branches.includes(name)) return '<span class="terminal-error">error: pathspec \'' + name + '\' did not match any branch</span>';
    terminalState.branch = name;
    return '<span class="terminal-output">Switched to branch \'' + name + '\'</span>';
  }
  const switchCreate = cmd.match(/^git (?:switch -c|checkout -b) ([a-zA-Z0-9_\-\/]+)$/);
  if (switchCreate) {
    const name = switchCreate[1];
    if (terminalState.branches.includes(name)) return '<span class="terminal-error">fatal: branch \'' + name + '\' already exists</span>';
    terminalState.branches.push(name);
    terminalState.branch = name;
    return '<span class="terminal-output">Switched to a new branch \'' + name + '\'</span>';
  }

  const mergeMatch = cmd.match(/^git merge (\S+)$/);
  if (mergeMatch) {
    const name = mergeMatch[1];
    if (name === '--abort') return '';
    if (!terminalState.branches.includes(name)) return '<span class="terminal-error">merge: ' + name + ' - not something we can merge</span>';
    const hash = generateHash();
    terminalState.commits.push({ hash, message: 'Merge branch \'' + name + '\'', branch: terminalState.branch, files: [] });
    return '<span class="terminal-output">Merge made by the \'ort\' strategy.</span>';
  }

  if (cmd === 'git diff') {
    if (terminalState.modified.length === 0) return '';
    return terminalState.modified.map(f =>
      '<span class="terminal-info">diff --git a/' + f + ' b/' + f + '</span>\n<span class="terminal-error">--- a/' + f + '</span>\n<span class="terminal-output">+++ b/' + f + '</span>'
    ).join('\n');
  }

  const remoteAdd = cmd.match(/^git remote add (\S+) (\S+)$/);
  if (remoteAdd) { terminalState.remotes[remoteAdd[1]] = remoteAdd[2]; return ''; }
  if (cmd === 'git remote -v') {
    const entries = Object.entries(terminalState.remotes);
    if (entries.length === 0) return '';
    return entries.map(([n, u]) => n + '\t' + u + ' (fetch)\n' + n + '\t' + u + ' (push)').join('\n');
  }

  if (cmd === 'git push' || cmd.startsWith('git push ')) {
    if (Object.keys(terminalState.remotes).length === 0) return '<span class="terminal-error">fatal: No configured push destination</span>';
    return '<span class="terminal-output">Enumerating objects: done.\nTo ' + (Object.values(terminalState.remotes)[0]) + '\n   ' + terminalState.branch + ' -> ' + terminalState.branch + '</span>';
  }
  if (cmd === 'git pull' || cmd.startsWith('git pull ')) {
    if (Object.keys(terminalState.remotes).length === 0) return '<span class="terminal-error">fatal: No remote configured</span>';
    return '<span class="terminal-output">Already up to date.</span>';
  }

  if (cmd.startsWith('git clone ')) {
    const url = cmd.substring(10).trim();
    const repoName = url.split('/').pop().replace('.git', '') || 'repo';
    terminalState.initialized = true; terminalState.remotes['origin'] = url;
    const hash = generateHash();
    terminalState.commits.push({ hash, message: 'Initial commit', branch: 'main', files: ['README.md'] });
    terminalState.files['README.md'] = '# ' + repoName;
    return '<span class="terminal-output">Cloning into \'' + repoName + '\'...\nremote: Enumerating objects: 42, done.\nReceiving objects: 100%, done.</span>';
  }

  if (cmd === 'git stash') {
    if (!terminalState.modified.length && !terminalState.staged.length) return '<span class="terminal-error">No local changes to save</span>';
    terminalState.stash.push({ modified: [...terminalState.modified], staged: [...terminalState.staged] });
    terminalState.modified = []; terminalState.staged = [];
    return '<span class="terminal-output">Saved working directory and index state WIP on ' + terminalState.branch + '</span>';
  }
  if (cmd === 'git stash list') {
    if (!terminalState.stash.length) return '';
    return terminalState.stash.map((s, i) => 'stash@{' + i + '}: WIP on ' + terminalState.branch).join('\n');
  }
  if (cmd === 'git stash pop') {
    if (!terminalState.stash.length) return '<span class="terminal-error">No stash entries found.</span>';
    const entry = terminalState.stash.pop();
    terminalState.modified.push(...entry.modified); terminalState.staged.push(...entry.staged);
    return '<span class="terminal-output">Dropped refs/stash@{0}</span>';
  }
  if (cmd === 'git stash apply') {
    if (!terminalState.stash.length) return '<span class="terminal-error">No stash entries found.</span>';
    const entry = terminalState.stash[terminalState.stash.length - 1];
    terminalState.modified.push(...entry.modified); terminalState.staged.push(...entry.staged);
    return '<span class="terminal-output">Applied stash@{0}</span>';
  }

  const tagMatch = cmd.match(/^git tag (\S+)$/);
  if (tagMatch) { terminalState.tags.push(tagMatch[1]); return ''; }
  const tagAnnotated = cmd.match(/^git tag -a (\S+) -m ["'](.+)["']$/);
  if (tagAnnotated) { terminalState.tags.push(tagAnnotated[1]); return ''; }
  if (cmd === 'git tag') return terminalState.tags.join('\n');

  if (cmd.startsWith('git reset --soft')) {
    if (terminalState.commits.length > 0) { const r = terminalState.commits.pop(); terminalState.staged.push(...(r.files || [])); }
    return '';
  }
  if (cmd.startsWith('git reset --hard')) {
    if (terminalState.commits.length > 0) { terminalState.commits.pop(); terminalState.staged = []; terminalState.modified = []; }
    const h = terminalState.commits.length > 0 ? terminalState.commits[terminalState.commits.length-1].hash : '0000000';
    return '<span class="terminal-warning">HEAD is now at ' + h + '</span>';
  }
  if (cmd === 'git reset' || cmd.startsWith('git reset HEAD')) {
    terminalState.untracked.push(...terminalState.staged); terminalState.staged = [];
    return '';
  }

  if (cmd.startsWith('git revert ')) {
    const hash = generateHash();
    terminalState.commits.push({ hash, message: 'Revert previous commit', branch: terminalState.branch, files: [] });
    return '<span class="terminal-output">[' + terminalState.branch + ' ' + hash + '] Revert previous commit</span>';
  }

  if (cmd === 'git reflog') {
    if (!terminalState.commits.length) return '';
    return terminalState.commits.slice().reverse().map((c, i) =>
      '<span class="terminal-info">' + c.hash + '</span> HEAD@{' + i + '}: commit: ' + c.message
    ).join('\n');
  }

  if (cmd.startsWith('git cherry-pick ')) {
    const hash = generateHash();
    terminalState.commits.push({ hash, message: 'Cherry-picked commit', branch: terminalState.branch, files: [] });
    return '<span class="terminal-output">[' + terminalState.branch + ' ' + hash + '] Cherry-picked commit</span>';
  }

  if (cmd === 'git rebase --abort' || cmd === 'git merge --abort') return '';
  if (cmd.startsWith('git rebase ')) return '<span class="terminal-output">Successfully rebased and updated refs/heads/' + terminalState.branch + '.</span>';

  if (cmd.startsWith('git blame ')) {
    const file = cmd.substring(10).trim();
    if (terminalState.files[file] !== undefined) {
      const h = terminalState.commits.length > 0 ? terminalState.commits[0].hash : 'a1b2c3d';
      return (terminalState.files[file] || '').split('\n').map((line, i) => '<span class="terminal-info">' + h + '</span> (You 2024-01-15 ' + (i+1) + ') ' + line).join('\n');
    }
    return '<span class="terminal-error">fatal: no such path \'' + file + '\'</span>';
  }

  if (cmd.startsWith('git show ')) {
    const last = terminalState.commits.length > 0 ? terminalState.commits[terminalState.commits.length - 1] : null;
    if (!last) return '<span class="terminal-error">fatal: bad object</span>';
    return '<span class="terminal-info">commit ' + last.hash + '</span>\nAuthor: Your Name\n\n    ' + last.message;
  }

  // Common mistakes detection
  var mistake = detectCommonMistake(cmd);
  if (mistake) return mistake;

  return '<span class="terminal-error">Command not recognized: ' + cmd.replace(/</g,'&lt;') + '</span>\nType <span class="terminal-info">help</span> for available commands.';
}

function detectCommonMistake(cmd) {
  var mistakes = [
    { pattern: /^git add$/i, msg: 'git add', correct: 'git add .', hint: 'You need to specify which files to add. Use <code>git add .</code> to add all, or <code>git add &lt;file&gt;</code> for a specific file.' },
    { pattern: /^git commit$/i, msg: 'git commit', correct: 'git commit -m "message"', hint: 'Commits require a message. Use <code>git commit -m "your message"</code>.' },
    { pattern: /^git commit -m$/i, msg: 'git commit -m', correct: 'git commit -m "message"', hint: 'You forgot the commit message. Use <code>git commit -m "your message"</code>.' },
    { pattern: /^git commit -m [^"'][^\s]*$/i, msg: null, correct: null, hint: 'Commit messages should be in quotes: <code>git commit -m "your message"</code>.' },
    { pattern: /^git push -f|git push --force$/i, msg: 'force push', correct: 'git push', hint: '<span class="terminal-warning">⚠ Force pushing overwrites remote history!</span> Only use this if you know what you\'re doing. Prefer <code>git push</code> or <code>git push --force-with-lease</code>.' },
    { pattern: /^git checkout -b$/i, msg: 'git checkout -b', correct: 'git checkout -b branch-name', hint: 'You need to specify a branch name: <code>git switch -c feature-name</code> (modern) or <code>git checkout -b feature-name</code>.' },
    { pattern: /^git switch$/i, msg: 'git switch', correct: 'git switch branch-name', hint: 'Specify which branch to switch to: <code>git switch main</code> or <code>git switch -c new-branch</code>.' },
    { pattern: /^git branch -d$/i, msg: 'git branch -d', correct: 'git branch -d branch-name', hint: 'Specify the branch to delete: <code>git branch -d feature-name</code>.' },
    { pattern: /^git merge$/i, msg: 'git merge', correct: 'git merge branch-name', hint: 'Specify the branch to merge: <code>git merge feature-name</code>.' },
    { pattern: /^git stash pop .+/i, msg: 'git stash pop <args>', correct: 'git stash pop', hint: 'To pop a specific stash, use <code>git stash pop stash@{n}</code>. Plain <code>git stash pop</code> pops the latest.' },
    { pattern: /^git add \.\./i, msg: 'git add ..', correct: 'git add .', hint: 'Use a single dot <code>git add .</code> to stage all files in the current directory.' },
    { pattern: /^git comit/i, msg: 'git comit', correct: 'git commit', hint: 'Typo: Did you mean <code>git commit -m "message"</code>?' },
    { pattern: /^git stauts/i, msg: 'git stauts', correct: 'git status', hint: 'Typo: Did you mean <code>git status</code>?' },
    { pattern: /^git chekout/i, msg: 'git chekout', correct: 'git checkout', hint: 'Typo: Did you mean <code>git checkout</code>? Or use the modern <code>git switch</code>.' },
    { pattern: /^git pul$/i, msg: 'git pul', correct: 'git pull', hint: 'Typo: Did you mean <code>git pull</code>?' },
    { pattern: /^git psuh/i, msg: 'git psuh', correct: 'git push', hint: 'Typo: Did you mean <code>git push</code>?' },
    { pattern: /^git inti/i, msg: 'git inti', correct: 'git init', hint: 'Typo: Did you mean <code>git init</code>?' },
    { pattern: /^git brach/i, msg: 'git brach', correct: 'git branch', hint: 'Typo: Did you mean <code>git branch</code>?' },
    { pattern: /^git reset --hard HEAD$/i, msg: 'git reset --hard HEAD', correct: 'git reset --hard HEAD~1', hint: '<span class="terminal-warning">⚠ Careful!</span> <code>git reset --hard</code> discards all uncommitted changes permanently. Use <code>git stash</code> first if you want to save them.' },
    { pattern: /^git rm /i, msg: 'git rm', correct: null, hint: '<code>git rm</code> removes files from both the working directory and staging area. To only unstage, use <code>git restore --staged &lt;file&gt;</code>.' },
    { pattern: /^git checkout -- \./i, msg: 'git checkout -- .', correct: 'git restore .', hint: 'The modern way to discard changes is <code>git restore .</code> — <code>git checkout --</code> is the older syntax.' },
  ];

  for (var i = 0; i < mistakes.length; i++) {
    if (mistakes[i].pattern.test(cmd)) {
      var out = '<span class="terminal-warning">💡 Common Mistake Detected:</span>\n';
      out += mistakes[i].hint;
      if (mistakes[i].correct) {
        out += '\n\n<span class="terminal-info">✓ Try:</span> <code>' + mistakes[i].correct + '</code>';
      }
      return out;
    }
  }

  // Subcommand suggestions for partial git commands
  if (cmd === 'git') {
    return '<span class="terminal-info">Available git subcommands:</span>\n' +
      '  <span class="terminal-output">Setup:</span>      init, clone, config\n' +
      '  <span class="terminal-output">Basics:</span>     status, add, commit, diff, log\n' +
      '  <span class="terminal-output">Branching:</span>  branch, switch, checkout, merge, rebase\n' +
      '  <span class="terminal-output">Remote:</span>     remote, push, pull, fetch, clone\n' +
      '  <span class="terminal-output">Undo:</span>       restore, reset, revert, stash\n' +
      '  <span class="terminal-output">Inspect:</span>    log, show, blame, diff, reflog\n' +
      '  <span class="terminal-output">Tags:</span>       tag\n' +
      '  <span class="terminal-output">Advanced:</span>   cherry-pick, rebase, stash\n\n' +
      'Type a full command like <span class="terminal-info">git init</span> or <span class="terminal-info">git status</span>';
  }

  return null;
}

var terminalCommands = [
  'git init', 'git status', 'git add .', 'git add', 'git commit -m "', 'git log', 'git log --oneline',
  'git diff', 'git branch', 'git switch ', 'git switch -c ', 'git checkout ', 'git checkout -b ',
  'git merge ', 'git rebase ', 'git remote add origin ', 'git remote -v', 'git push', 'git push -u origin main',
  'git pull', 'git clone ', 'git stash', 'git stash pop', 'git stash list', 'git stash apply',
  'git tag ', 'git tag -a ', 'git reset --soft HEAD~1', 'git reset --hard HEAD~1', 'git reset HEAD',
  'git revert ', 'git reflog', 'git cherry-pick ', 'git blame ', 'git show ', 'git config --list',
  'git --version', 'touch ', 'echo "content" > file.txt', 'ls', 'ls -la', 'cat ', 'mkdir ', 'pwd', 'clear', 'help',
  'git restore ', 'git restore --staged ', 'git branch -d ', 'git branch -a'
];

function setupTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('playground-terminal');
  if (!input || !body) return;

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var val = this.value;
      if (!val) return;
      var matches = terminalCommands.filter(function(c) { return c.startsWith(val) && c !== val; });
      if (matches.length === 1) {
        this.value = matches[0];
      } else if (matches.length > 1) {
        var outLine = document.createElement('div');
        outLine.className = 'terminal-line terminal-output';
        outLine.innerHTML = '<span class="terminal-info">' + matches.join('  ') + '</span>';
        body.appendChild(outLine);
        body.scrollTop = body.scrollHeight;
        var common = val;
        for (var i = val.length; i < matches[0].length; i++) {
          var ch = matches[0][i];
          if (matches.every(function(m) { return m[i] === ch; })) common += ch;
          else break;
        }
        this.value = common;
      }
      return;
    }
    if (e.key === 'Enter') {
      const cmd = this.value.trim();
      if (!cmd) return;
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      cmdLine.innerHTML = '<span class="terminal-prompt"></span> <span class="terminal-command">' + cmd.replace(/</g,'&lt;') + '</span>';
      body.appendChild(cmdLine);
      const result = processCommand(cmd);
      if (result === '__CLEAR__') { body.innerHTML = ''; }
      else if (result) {
        const outLine = document.createElement('div');
        outLine.className = 'terminal-line terminal-output';
        outLine.innerHTML = result;
        body.appendChild(outLine);
      }
      this.value = '';
      body.scrollTop = body.scrollHeight;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalState.historyIndex > 0) { terminalState.historyIndex--; this.value = terminalState.commandHistory[terminalState.historyIndex] || ''; }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (terminalState.historyIndex < terminalState.commandHistory.length - 1) { terminalState.historyIndex++; this.value = terminalState.commandHistory[terminalState.historyIndex] || ''; }
      else { terminalState.historyIndex = terminalState.commandHistory.length; this.value = ''; }
    }
  });

  const termContainer = document.querySelector('.terminal-large');
  if (termContainer) termContainer.addEventListener('click', () => input.focus());
}

function setupQuickCommands() {
  const container = document.getElementById('quick-commands');
  if (!container) return;
  ['git init','git status','git add .','git commit -m "message"','git log --oneline',
   'git branch','git switch -c feature','git merge feature','git diff','git stash',
   'git remote -v','git push','touch file.txt','ls','clear','help'].forEach(cmd => {
    const btn = document.createElement('button');
    btn.className = 'quick-cmd-btn';
    btn.textContent = cmd;
    btn.addEventListener('click', () => {
      const input = document.getElementById('terminal-input');
      if (input) { input.value = cmd; input.focus(); input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); }
    });
    container.appendChild(btn);
  });
}

// ==================== TERMINAL ENHANCEMENTS ====================

// --- 1. Live Git State Panel + File Explorer ---
function renderTerminalState() {
  var bp = document.getElementById('state-branch-name');
  if (bp) bp.textContent = terminalState.initialized ? terminalState.branch : '—';

  var ft = document.getElementById('file-tree');
  if (ft) {
    var files = Object.keys(terminalState.files).filter(function(f) { return terminalState.files[f] !== null; });
    if (files.length === 0 && !terminalState.initialized) {
      ft.innerHTML = '<div class="file-tree-empty">' + t('terminal.state.noFiles') + '</div>';
    } else {
      var html = '';
      if (terminalState.initialized) html += '<div class="ft-item ft-committed"><i class="fa-solid fa-folder"></i><span class="ft-name">.git/</span></div>';
      files.forEach(function(f) {
        var cls = 'ft-committed', badge = '', icon = 'fa-file-code';
        if (terminalState.staged.indexOf(f) >= 0) { cls = 'ft-staged'; badge = '<span class="ft-badge">staged</span>'; }
        else if (terminalState.modified.indexOf(f) >= 0) { cls = 'ft-modified'; badge = '<span class="ft-badge">modified</span>'; }
        else if (terminalState.untracked.indexOf(f) >= 0) { cls = 'ft-untracked'; badge = '<span class="ft-badge">new</span>'; }
        if (f.endsWith('/')) icon = 'fa-folder';
        else if (f.endsWith('.md')) icon = 'fa-file-lines';
        else if (f.endsWith('.json')) icon = 'fa-file-code';
        else if (f.endsWith('.txt')) icon = 'fa-file';
        else if (f.endsWith('.js')) icon = 'fa-brands fa-js';
        html += '<div class="ft-item ' + cls + '"><i class="fa-solid ' + icon + '"></i><span class="ft-name">' + escapeHtml(f) + '</span>' + badge + '</div>';
      });
      ft.innerHTML = html;
    }
  }

  var cg = document.getElementById('commit-mini-graph');
  if (cg) {
    if (terminalState.commits.length === 0) {
      cg.innerHTML = '<div class="cm-empty">' + t('terminal.state.noCommits') + '</div>';
    } else {
      var html = '';
      terminalState.commits.slice().reverse().slice(0, 8).forEach(function(c, i) {
        if (i > 0) html += '<div class="cm-line"></div>';
        html += '<div class="cm-item"><span class="cm-dot"></span><span class="cm-hash">' + c.hash.substring(0, 7) + '</span><span class="cm-msg">' + escapeHtml(c.message) + '</span></div>';
      });
      if (terminalState.commits.length > 8) html += '<div class="cm-item" style="color:#484f58">... ' + (terminalState.commits.length - 8) + ' more</div>';
      cg.innerHTML = html;
    }
  }
}

// --- 2. Guided Challenges ---
var termChallenges = [
  // Beginner
  { id: 'first-commit', nameKey: 'terminal.ch.firstCommit', descKey: 'terminal.ch.firstCommit.desc', level: 'beginner', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.firstCommit.s1', hintKey: 'terminal.ch.firstCommit.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.firstCommit.s2', hintKey: 'terminal.ch.firstCommit.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.firstCommit.s3', hintKey: 'terminal.ch.firstCommit.s3.hint', alt: ['git add README'] },
    { cmd: 'git commit', labelKey: 'terminal.ch.firstCommit.s4', hintKey: 'terminal.ch.firstCommit.s4.hint' }
  ]},
  { id: 'basic-status', nameKey: 'terminal.ch.basicStatus', descKey: 'terminal.ch.basicStatus.desc', level: 'beginner', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.basicStatus.s1', hintKey: 'terminal.ch.basicStatus.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.basicStatus.s2', hintKey: 'terminal.ch.basicStatus.s2.hint', alt: ['echo'] },
    { cmd: 'git status', labelKey: 'terminal.ch.basicStatus.s3', hintKey: 'terminal.ch.basicStatus.s3.hint' },
    { cmd: 'git add', labelKey: 'terminal.ch.basicStatus.s4', hintKey: 'terminal.ch.basicStatus.s4.hint' },
    { cmd: 'git status', labelKey: 'terminal.ch.basicStatus.s5', hintKey: 'terminal.ch.basicStatus.s5.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.basicStatus.s6', hintKey: 'terminal.ch.basicStatus.s6.hint' },
    { cmd: 'git log', labelKey: 'terminal.ch.basicStatus.s7', hintKey: 'terminal.ch.basicStatus.s7.hint', alt: ['git log'] }
  ]},
  { id: 'branching', nameKey: 'terminal.ch.branching', descKey: 'terminal.ch.branching.desc', level: 'beginner', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.branching.s1', hintKey: 'terminal.ch.branching.s1.hint' },
    { cmd: 'git switch -c', labelKey: 'terminal.ch.branching.s2', hintKey: 'terminal.ch.branching.s2.hint', alt: ['git checkout -b', 'git branch'] },
    { cmd: 'touch', labelKey: 'terminal.ch.branching.s3', hintKey: 'terminal.ch.branching.s3.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.branching.s4', hintKey: 'terminal.ch.branching.s4.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.branching.s5', hintKey: 'terminal.ch.branching.s5.hint' },
    { cmd: 'git switch main', labelKey: 'terminal.ch.branching.s6', hintKey: 'terminal.ch.branching.s6.hint', alt: ['git checkout main'] },
    { cmd: 'git merge', labelKey: 'terminal.ch.branching.s7', hintKey: 'terminal.ch.branching.s7.hint' }
  ]},
  // Intermediate
  { id: 'remote-flow', nameKey: 'terminal.ch.remote', descKey: 'terminal.ch.remote.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.remote.s1', hintKey: 'terminal.ch.remote.s1.hint' },
    { cmd: 'git remote add', labelKey: 'terminal.ch.remote.s2', hintKey: 'terminal.ch.remote.s2.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.remote.s3', hintKey: 'terminal.ch.remote.s3.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.remote.s4', hintKey: 'terminal.ch.remote.s4.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.remote.s5', hintKey: 'terminal.ch.remote.s5.hint' },
    { cmd: 'git push', labelKey: 'terminal.ch.remote.s6', hintKey: 'terminal.ch.remote.s6.hint' }
  ]},
  { id: 'stash-flow', nameKey: 'terminal.ch.stash', descKey: 'terminal.ch.stash.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.stash.s1', hintKey: 'terminal.ch.stash.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.stash.s2', hintKey: 'terminal.ch.stash.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.stash.s3', hintKey: 'terminal.ch.stash.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.stash.s4', hintKey: 'terminal.ch.stash.s4.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.stash.s5', hintKey: 'terminal.ch.stash.s5.hint', alt: ['echo'] },
    { cmd: 'git stash', labelKey: 'terminal.ch.stash.s6', hintKey: 'terminal.ch.stash.s6.hint' },
    { cmd: 'git stash pop', labelKey: 'terminal.ch.stash.s7', hintKey: 'terminal.ch.stash.s7.hint', alt: ['git stash apply'] }
  ]},
  { id: 'tagging', nameKey: 'terminal.ch.tagging', descKey: 'terminal.ch.tagging.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.tagging.s1', hintKey: 'terminal.ch.tagging.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.tagging.s2', hintKey: 'terminal.ch.tagging.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.tagging.s3', hintKey: 'terminal.ch.tagging.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.tagging.s4', hintKey: 'terminal.ch.tagging.s4.hint' },
    { cmd: 'git tag', labelKey: 'terminal.ch.tagging.s5', hintKey: 'terminal.ch.tagging.s5.hint' },
    { cmd: 'git tag', labelKey: 'terminal.ch.tagging.s6', hintKey: 'terminal.ch.tagging.s6.hint' }
  ]},
  { id: 'diff-inspect', nameKey: 'terminal.ch.diff', descKey: 'terminal.ch.diff.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.diff.s1', hintKey: 'terminal.ch.diff.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.diff.s2', hintKey: 'terminal.ch.diff.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.diff.s3', hintKey: 'terminal.ch.diff.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.diff.s4', hintKey: 'terminal.ch.diff.s4.hint' },
    { cmd: 'echo', labelKey: 'terminal.ch.diff.s5', hintKey: 'terminal.ch.diff.s5.hint' },
    { cmd: 'git diff', labelKey: 'terminal.ch.diff.s6', hintKey: 'terminal.ch.diff.s6.hint' },
    { cmd: 'git add', labelKey: 'terminal.ch.diff.s7', hintKey: 'terminal.ch.diff.s7.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.diff.s8', hintKey: 'terminal.ch.diff.s8.hint' }
  ]},
  // Advanced
  { id: 'undo', nameKey: 'terminal.ch.undo', descKey: 'terminal.ch.undo.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.undo.s1', hintKey: 'terminal.ch.undo.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.undo.s2', hintKey: 'terminal.ch.undo.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.undo.s3', hintKey: 'terminal.ch.undo.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.undo.s4', hintKey: 'terminal.ch.undo.s4.hint' },
    { cmd: 'git log', labelKey: 'terminal.ch.undo.s5', hintKey: 'terminal.ch.undo.s5.hint', alt: ['git log'] },
    { cmd: 'git reset', labelKey: 'terminal.ch.undo.s6', hintKey: 'terminal.ch.undo.s6.hint' },
    { cmd: 'git status', labelKey: 'terminal.ch.undo.s7', hintKey: 'terminal.ch.undo.s7.hint' }
  ]},
  { id: 'cherry-pick', nameKey: 'terminal.ch.cherryPick', descKey: 'terminal.ch.cherryPick.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.cherryPick.s1', hintKey: 'terminal.ch.cherryPick.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.cherryPick.s2', hintKey: 'terminal.ch.cherryPick.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.cherryPick.s3', hintKey: 'terminal.ch.cherryPick.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.cherryPick.s4', hintKey: 'terminal.ch.cherryPick.s4.hint' },
    { cmd: 'git switch -c', labelKey: 'terminal.ch.cherryPick.s5', hintKey: 'terminal.ch.cherryPick.s5.hint', alt: ['git checkout -b'] },
    { cmd: 'touch', labelKey: 'terminal.ch.cherryPick.s6', hintKey: 'terminal.ch.cherryPick.s6.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.cherryPick.s7', hintKey: 'terminal.ch.cherryPick.s7.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.cherryPick.s8', hintKey: 'terminal.ch.cherryPick.s8.hint' },
    { cmd: 'git switch main', labelKey: 'terminal.ch.cherryPick.s9', hintKey: 'terminal.ch.cherryPick.s9.hint', alt: ['git checkout main'] },
    { cmd: 'git cherry-pick', labelKey: 'terminal.ch.cherryPick.s10', hintKey: 'terminal.ch.cherryPick.s10.hint' }
  ]},
  { id: 'rebase', nameKey: 'terminal.ch.rebase', descKey: 'terminal.ch.rebase.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.rebase.s1', hintKey: 'terminal.ch.rebase.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.rebase.s2', hintKey: 'terminal.ch.rebase.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.rebase.s3', hintKey: 'terminal.ch.rebase.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.rebase.s4', hintKey: 'terminal.ch.rebase.s4.hint' },
    { cmd: 'git switch -c', labelKey: 'terminal.ch.rebase.s5', hintKey: 'terminal.ch.rebase.s5.hint', alt: ['git checkout -b'] },
    { cmd: 'touch', labelKey: 'terminal.ch.rebase.s6', hintKey: 'terminal.ch.rebase.s6.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.rebase.s7', hintKey: 'terminal.ch.rebase.s7.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.rebase.s8', hintKey: 'terminal.ch.rebase.s8.hint' },
    { cmd: 'git rebase', labelKey: 'terminal.ch.rebase.s9', hintKey: 'terminal.ch.rebase.s9.hint' }
  ]},
  // New challenges
  { id: 'detached-head', nameKey: 'terminal.ch.detachedHead', descKey: 'terminal.ch.detachedHead.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.detachedHead.s1', hintKey: 'terminal.ch.detachedHead.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.detachedHead.s2', hintKey: 'terminal.ch.detachedHead.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.detachedHead.s3', hintKey: 'terminal.ch.detachedHead.s3.hint' },
    { cmd: 'git commit', labelKey: 'terminal.ch.detachedHead.s4', hintKey: 'terminal.ch.detachedHead.s4.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.detachedHead.s5', hintKey: 'terminal.ch.detachedHead.s5.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.detachedHead.s6', hintKey: 'terminal.ch.detachedHead.s6.hint' },
    { cmd: 'git log', labelKey: 'terminal.ch.detachedHead.s7', hintKey: 'terminal.ch.detachedHead.s7.hint' },
    { cmd: 'git checkout HEAD', labelKey: 'terminal.ch.detachedHead.s8', hintKey: 'terminal.ch.detachedHead.s8.hint', alt: ['git checkout HEAD~1'] },
    { cmd: 'git checkout main', labelKey: 'terminal.ch.detachedHead.s9', hintKey: 'terminal.ch.detachedHead.s9.hint', alt: ['git switch main'] }
  ]},
  { id: 'pull-rebase', nameKey: 'terminal.ch.pullRebase', descKey: 'terminal.ch.pullRebase.desc', level: 'intermediate', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.pullRebase.s1', hintKey: 'terminal.ch.pullRebase.s1.hint' },
    { cmd: 'git remote add', labelKey: 'terminal.ch.pullRebase.s2', hintKey: 'terminal.ch.pullRebase.s2.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.pullRebase.s3', hintKey: 'terminal.ch.pullRebase.s3.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.pullRebase.s4', hintKey: 'terminal.ch.pullRebase.s4.hint' },
    { cmd: 'git push', labelKey: 'terminal.ch.pullRebase.s5', hintKey: 'terminal.ch.pullRebase.s5.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.pullRebase.s6', hintKey: 'terminal.ch.pullRebase.s6.hint', alt: ['echo'] },
    { cmd: 'git pull --rebase', labelKey: 'terminal.ch.pullRebase.s7', hintKey: 'terminal.ch.pullRebase.s7.hint', alt: ['git pull'] }
  ]},
  { id: 'interactive-rebase', nameKey: 'terminal.ch.interactiveRebase', descKey: 'terminal.ch.interactiveRebase.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.interactiveRebase.s1', hintKey: 'terminal.ch.interactiveRebase.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.interactiveRebase.s2', hintKey: 'terminal.ch.interactiveRebase.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.interactiveRebase.s3', hintKey: 'terminal.ch.interactiveRebase.s3.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.interactiveRebase.s4', hintKey: 'terminal.ch.interactiveRebase.s4.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.interactiveRebase.s5', hintKey: 'terminal.ch.interactiveRebase.s5.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.interactiveRebase.s6', hintKey: 'terminal.ch.interactiveRebase.s6.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.interactiveRebase.s7', hintKey: 'terminal.ch.interactiveRebase.s7.hint' },
    { cmd: 'git log', labelKey: 'terminal.ch.interactiveRebase.s8', hintKey: 'terminal.ch.interactiveRebase.s8.hint' },
    { cmd: 'git rebase -i', labelKey: 'terminal.ch.interactiveRebase.s9', hintKey: 'terminal.ch.interactiveRebase.s9.hint', alt: ['git rebase'] }
  ]},
  { id: 'bisect', nameKey: 'terminal.ch.bisect', descKey: 'terminal.ch.bisect.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.bisect.s1', hintKey: 'terminal.ch.bisect.s1.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.bisect.s2', hintKey: 'terminal.ch.bisect.s2.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.bisect.s3', hintKey: 'terminal.ch.bisect.s3.hint' },
    { cmd: 'echo', labelKey: 'terminal.ch.bisect.s4', hintKey: 'terminal.ch.bisect.s4.hint' },
    { cmd: 'git add', labelKey: 'terminal.ch.bisect.s5', hintKey: 'terminal.ch.bisect.s5.hint' },
    { cmd: 'git bisect start', labelKey: 'terminal.ch.bisect.s6', hintKey: 'terminal.ch.bisect.s6.hint', alt: ['git bisect'] },
    { cmd: 'git bisect bad', labelKey: 'terminal.ch.bisect.s7', hintKey: 'terminal.ch.bisect.s7.hint', alt: ['git bisect'] },
    { cmd: 'git bisect good', labelKey: 'terminal.ch.bisect.s8', hintKey: 'terminal.ch.bisect.s8.hint', alt: ['git bisect'] },
    { cmd: 'git bisect reset', labelKey: 'terminal.ch.bisect.s9', hintKey: 'terminal.ch.bisect.s9.hint', alt: ['git bisect'] }
  ]},
  { id: 'force-push-safe', nameKey: 'terminal.ch.forcePush', descKey: 'terminal.ch.forcePush.desc', level: 'advanced', steps: [
    { cmd: 'git init', labelKey: 'terminal.ch.forcePush.s1', hintKey: 'terminal.ch.forcePush.s1.hint' },
    { cmd: 'git remote add', labelKey: 'terminal.ch.forcePush.s2', hintKey: 'terminal.ch.forcePush.s2.hint' },
    { cmd: 'touch', labelKey: 'terminal.ch.forcePush.s3', hintKey: 'terminal.ch.forcePush.s3.hint', alt: ['echo'] },
    { cmd: 'git add', labelKey: 'terminal.ch.forcePush.s4', hintKey: 'terminal.ch.forcePush.s4.hint' },
    { cmd: 'git push', labelKey: 'terminal.ch.forcePush.s5', hintKey: 'terminal.ch.forcePush.s5.hint' },
    { cmd: 'git commit --amend', labelKey: 'terminal.ch.forcePush.s6', hintKey: 'terminal.ch.forcePush.s6.hint', alt: ['git commit'] },
    { cmd: 'git push --force-with-lease', labelKey: 'terminal.ch.forcePush.s7', hintKey: 'terminal.ch.forcePush.s7.hint', alt: ['git push'] }
  ]}
];
var currentChallenge = null;
var challengeProgress = 0;
var currentChallengeLevel = 'all';

function setupChallengeLevelTabs() {
  var container = document.getElementById('challenge-level-tabs');
  if (!container) return;
  container.querySelectorAll('.ch-level-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      container.querySelectorAll('.ch-level-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentChallengeLevel = btn.dataset.level;
      renderChallengeBar();
    });
  });
}

function renderChallengeBar() {
  var tabs = document.getElementById('challenge-tabs');
  if (!tabs) return;
  var html = '';
  var completed = JSON.parse(localStorage.getItem('gitmaster-challenges') || '[]');
  var filtered = currentChallengeLevel === 'all' ? termChallenges : termChallenges.filter(function(ch) { return ch.level === currentChallengeLevel; });
  filtered.forEach(function(ch) {
    var done = completed.indexOf(ch.id) >= 0;
    html += '<button class="challenge-tab-btn' + (currentChallenge && currentChallenge.id === ch.id ? ' active' : '') + (done ? ' completed' : '') + '" data-ch="' + ch.id + '">' +
      '<span class="ch-level-dot ' + ch.level + '"></span>' +
      (done ? '<i class="fa-solid fa-check"></i> ' : '') + t(ch.nameKey) + '</button>';
  });
  tabs.innerHTML = html;
  tabs.querySelectorAll('.challenge-tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { selectChallenge(btn.dataset.ch); });
  });
}

function selectChallenge(id) {
  var ch = termChallenges.find(function(c) { return c.id === id; });
  if (!ch) return;
  currentChallenge = ch;
  challengeProgress = 0;
  terminalState = { initialized: false, branch: 'main', branches: ['main'], commits: [], staged: [], untracked: [], modified: [], files: {}, remotes: {}, stash: [], tags: [], commandHistory: terminalState.commandHistory, historyIndex: terminalState.historyIndex };
  var body = document.getElementById('playground-terminal');
  if (body) body.innerHTML = '<div class="terminal-line terminal-output"><span class="terminal-info">' + t('terminal.ch.started') + ': ' + t(ch.nameKey) + '</span></div>';
  renderChallengeBar();
  renderGuidePanel();
  renderTerminalState();
}

function renderGuidePanel() {
  var quickPanel = document.getElementById('sidebar-quick');
  var guidePanel = document.getElementById('sidebar-guide');
  if (!quickPanel || !guidePanel) return;

  if (!currentChallenge) {
    quickPanel.style.display = '';
    guidePanel.style.display = 'none';
    return;
  }

  quickPanel.style.display = 'none';
  guidePanel.style.display = '';

  var titleEl = document.getElementById('guide-title');
  var descEl = document.getElementById('guide-desc');
  var progressFill = document.getElementById('guide-progress-fill');
  var progressText = document.getElementById('guide-progress-text');
  var stepsEl = document.getElementById('guide-steps');
  var completeMsg = document.getElementById('guide-complete-msg');

  if (titleEl) titleEl.textContent = t(currentChallenge.nameKey);
  if (descEl) descEl.textContent = t(currentChallenge.descKey);

  var total = currentChallenge.steps.length;
  var pct = total > 0 ? Math.round((challengeProgress / total) * 100) : 0;
  if (progressFill) progressFill.style.width = pct + '%';
  if (progressText) progressText.textContent = t('terminal.ch.step') + ' ' + Math.min(challengeProgress + 1, total) + ' / ' + total;

  var allDone = challengeProgress >= total;

  if (stepsEl) {
    var html = '';
    currentChallenge.steps.forEach(function(step, i) {
      var cls = i < challengeProgress ? 'done' : (i === challengeProgress ? 'current' : 'pending');
      var numContent = i < challengeProgress ? '<i class="fa-solid fa-check" style="font-size:0.6rem"></i>' : (i + 1);
      html += '<div class="guide-step ' + cls + '" id="guide-step-' + i + '">' +
        '<div class="guide-step-num">' + numContent + '</div>' +
        '<div class="guide-step-content">' +
          '<div class="guide-step-label">' + t(step.labelKey) + '</div>' +
          '<div class="guide-step-hint"><i class="fa-solid fa-terminal"></i> ' + t(step.hintKey) + '</div>' +
        '</div>' +
      '</div>';
    });
    stepsEl.innerHTML = html;

    var currentStepEl = stepsEl.querySelector('.guide-step.current');
    if (currentStepEl) currentStepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (completeMsg) {
    if (allDone) {
      completeMsg.style.display = 'flex';
      if (stepsEl) stepsEl.style.display = 'none';
      var completed = JSON.parse(localStorage.getItem('gitmaster-challenges') || '[]');
      if (completed.indexOf(currentChallenge.id) < 0) {
        completed.push(currentChallenge.id);
        localStorage.setItem('gitmaster-challenges', JSON.stringify(completed));
      }
      if (progressFill) progressFill.style.width = '100%';
      if (progressText) progressText.textContent = total + ' / ' + total + ' ✓';
    } else {
      completeMsg.style.display = 'none';
      if (stepsEl) stepsEl.style.display = '';
    }
  }
}

function closeGuidePanel() {
  currentChallenge = null;
  challengeProgress = 0;
  renderChallengeBar();
  renderGuidePanel();
}

function nextChallenge() {
  if (!currentChallenge) return;
  var idx = termChallenges.findIndex(function(c) { return c.id === currentChallenge.id; });
  if (idx < termChallenges.length - 1) {
    selectChallenge(termChallenges[idx + 1].id);
  } else {
    selectChallenge(termChallenges[0].id);
  }
}

function resetChallengeProgress() {
  localStorage.removeItem('gitmaster-challenges');
  localStorage.removeItem('gitmaster-achievements');
  unlockedAchievements = [];
  currentChallenge = null;
  challengeProgress = 0;
  progress.reset();
  renderChallengeBar();
  renderGuidePanel();
  renderAchievements();
  renderModules();
}

function setupGuideControls() {
  var closeBtn = document.getElementById('guide-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeGuidePanel);
  var nextBtn = document.getElementById('guide-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', nextChallenge);
  var resetBtn = document.getElementById('ch-reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetChallengeProgress);
}

function checkChallengeStep(cmd) {
  if (!currentChallenge || challengeProgress >= currentChallenge.steps.length) return;
  var step = currentChallenge.steps[challengeProgress];
  var match = cmd.startsWith(step.cmd);
  if (!match && step.alt) { match = step.alt.some(function(a) { return cmd.startsWith(a); }); }
  if (match) {
    challengeProgress++;
    var doneStepEl = document.getElementById('guide-step-' + (challengeProgress - 1));
    if (doneStepEl) { doneStepEl.style.animation = 'stepComplete 0.3s ease'; }
    renderGuidePanel();
    renderChallengeBar();
    updateAchievements();
  }
}

// --- 3. Command Breakdown Tooltips ---
var cmdBreakdowns = {
  'git': { type: 'base', tip: 'Git version control system' },
  'init': { type: 'sub', tip: 'Initialize a new repository' },
  'add': { type: 'sub', tip: 'Stage files for commit' },
  'commit': { type: 'sub', tip: 'Save staged changes as a snapshot' },
  'status': { type: 'sub', tip: 'Show working tree status' },
  'log': { type: 'sub', tip: 'Show commit history' },
  'branch': { type: 'sub', tip: 'List, create or delete branches' },
  'switch': { type: 'sub', tip: 'Switch to a different branch' },
  'checkout': { type: 'sub', tip: 'Switch branches or restore files' },
  'merge': { type: 'sub', tip: 'Combine branch histories' },
  'push': { type: 'sub', tip: 'Upload local commits to remote' },
  'pull': { type: 'sub', tip: 'Download & integrate remote changes' },
  'clone': { type: 'sub', tip: 'Copy a remote repository locally' },
  'remote': { type: 'sub', tip: 'Manage remote connections' },
  'stash': { type: 'sub', tip: 'Temporarily save uncommitted changes' },
  'diff': { type: 'sub', tip: 'Show differences between states' },
  'reset': { type: 'sub', tip: 'Undo commits or unstage files' },
  'revert': { type: 'sub', tip: 'Create a commit that undoes a previous one' },
  'rebase': { type: 'sub', tip: 'Reapply commits on top of another base' },
  'fetch': { type: 'sub', tip: 'Download remote objects without merging' },
  'tag': { type: 'sub', tip: 'Mark a specific commit with a label' },
  'blame': { type: 'sub', tip: 'Show who last modified each line' },
  'show': { type: 'sub', tip: 'Display commit details' },
  'reflog': { type: 'sub', tip: 'Show log of all HEAD movements' },
  'cherry-pick': { type: 'sub', tip: 'Apply a specific commit to current branch' },
  'restore': { type: 'sub', tip: 'Discard working directory changes' },
  'config': { type: 'sub', tip: 'Get/set Git configuration' },
  '-m': { type: 'flag', tip: 'Provide commit message inline' },
  '-a': { type: 'flag', tip: 'Stage all modified tracked files' },
  '-b': { type: 'flag', tip: 'Create and switch to new branch' },
  '-c': { type: 'flag', tip: 'Create and switch to new branch' },
  '-d': { type: 'flag', tip: 'Delete a branch (safe)' },
  '-D': { type: 'flag', tip: 'Force-delete a branch' },
  '-u': { type: 'flag', tip: 'Set upstream tracking branch' },
  '-v': { type: 'flag', tip: 'Verbose output' },
  '-r': { type: 'flag', tip: 'Show remote-tracking branches' },
  '-A': { type: 'flag', tip: 'Stage all changes (add + remove)' },
  '--oneline': { type: 'flag', tip: 'Show each commit on one line' },
  '--graph': { type: 'flag', tip: 'Show ASCII graph of branch structure' },
  '--all': { type: 'flag', tip: 'Include all branches' },
  '--soft': { type: 'flag', tip: 'Keep changes staged after reset' },
  '--hard': { type: 'flag', tip: 'Discard all changes (dangerous!)' },
  '--staged': { type: 'flag', tip: 'Show only staged changes' },
  '--abort': { type: 'flag', tip: 'Cancel and return to original state' },
  '--tags': { type: 'flag', tip: 'Push all tags to remote' },
  '--list': { type: 'flag', tip: 'List all configuration values' },
  '.': { type: 'arg', tip: 'All files in current directory' },
  'origin': { type: 'arg', tip: 'Default remote repository name' },
  'main': { type: 'arg', tip: 'Default/primary branch name' },
  'HEAD~1': { type: 'arg', tip: 'The commit before HEAD (parent)' },
  'HEAD': { type: 'arg', tip: 'Current commit pointer' }
};

function renderCommandBreakdown(cmd) {
  var el = document.getElementById('cmd-breakdown');
  if (!el) return;
  if (!cmd || !cmd.startsWith('git ')) { el.innerHTML = ''; el.classList.remove('active'); return; }
  var parts = cmd.match(/"[^"]*"|\S+/g) || [];
  var html = '<div class="cbd-parts">';
  parts.forEach(function(p) {
    var info = cmdBreakdowns[p];
    var cls = 'cbd-arg';
    var tip = '';
    if (info) { cls = 'cbd-' + info.type; tip = info.tip; }
    else if (p.startsWith('-')) { cls = 'cbd-flag'; tip = 'Flag/option'; }
    else if (p.startsWith('"')) { cls = 'cbd-arg'; tip = 'Argument value'; }
    else if (p.indexOf('.') >= 0 || p.indexOf('/') >= 0) { cls = 'cbd-file'; tip = 'File or path'; }
    html += '<span class="cbd-part ' + cls + '">' + escapeHtml(p);
    if (tip) html += '<span class="cbd-tooltip">' + tip + '</span>';
    html += '</span>';
  });
  html += '</div>';
  el.innerHTML = html;
  el.classList.add('active');
}

// --- 4. Enhanced Mistake Coach ---
function renderMistakeCoach(cmd, mistake) {
  var html = '<div class="mistake-coach">';
  html += '<div class="mc-header"><i class="fa-solid fa-lightbulb"></i> ' + t('terminal.mistake.title') + '</div>';
  html += '<div>' + mistake.hint + '</div>';
  if (mistake.correct) {
    html += '<div class="mc-compare"><span class="mc-wrong">' + escapeHtml(cmd) + '</span><span style="color:#484f58">→</span><span class="mc-right">' + escapeHtml(mistake.correct) + '</span></div>';
    html += '<button class="mc-fix-btn" data-fix="' + mistake.correct.replace(/"/g, '&quot;') + '"><i class="fa-solid fa-wrench"></i> ' + t('terminal.mistake.fix') + '</button>';
  }
  html += '</div>';
  return html;
}

// --- 5. Achievement System ---
var achievementDefs = [
  { id: 'first-init', icon: 'fa-rocket', nameKey: 'ach.firstInit', check: function() { return terminalState.initialized; }},
  { id: 'first-file', icon: 'fa-file-circle-plus', nameKey: 'ach.firstFile', check: function() { return Object.keys(terminalState.files).length > 0; }},
  { id: 'first-stage', icon: 'fa-layer-group', nameKey: 'ach.firstStage', check: function() { return terminalState.staged.length > 0 || terminalState.commits.length > 0; }},
  { id: 'first-commit', icon: 'fa-circle-check', nameKey: 'ach.firstCommit', check: function() { return terminalState.commits.length > 0; }},
  { id: 'five-commits', icon: 'fa-fire', nameKey: 'ach.fiveCommits', check: function() { return terminalState.commits.length >= 5; }},
  { id: 'branch-create', icon: 'fa-code-branch', nameKey: 'ach.branchCreate', check: function() { return terminalState.branches.length >= 2; }},
  { id: 'branch-merge', icon: 'fa-code-merge', nameKey: 'ach.branchMerge', check: function() { return terminalState.commits.some(function(c) { return c.message.indexOf('Merge') >= 0; }); }},
  { id: 'remote-setup', icon: 'fa-cloud', nameKey: 'ach.remoteSetup', check: function() { return Object.keys(terminalState.remotes).length > 0; }},
  { id: 'stash-use', icon: 'fa-box-archive', nameKey: 'ach.stashUse', check: function() { return terminalState.stash.length > 0 || (terminalState.commandHistory && terminalState.commandHistory.indexOf('git stash') >= 0); }},
  { id: 'ten-cmds', icon: 'fa-keyboard', nameKey: 'ach.tenCmds', check: function() { return terminalState.commandHistory.length >= 10; }},
  { id: 'tag-create', icon: 'fa-tag', nameKey: 'ach.tagCreate', check: function() { return terminalState.tags.length > 0; }},
  { id: 'challenge-complete', icon: 'fa-trophy', nameKey: 'ach.challengeComplete', check: function() { var c = JSON.parse(localStorage.getItem('gitmaster-challenges') || '[]'); return c.length > 0; }}
];
var unlockedAchievements = JSON.parse(localStorage.getItem('gitmaster-achievements') || '[]');

function updateAchievements() {
  var changed = false;
  achievementDefs.forEach(function(a) {
    if (unlockedAchievements.indexOf(a.id) < 0 && a.check()) {
      unlockedAchievements.push(a.id);
      changed = true;
    }
  });
  if (changed) localStorage.setItem('gitmaster-achievements', JSON.stringify(unlockedAchievements));
  renderAchievements();
}

function renderAchievements() {
  var el = document.getElementById('achievements-list');
  if (!el) return;
  var html = '';
  achievementDefs.forEach(function(a) {
    var unlocked = unlockedAchievements.indexOf(a.id) >= 0;
    html += '<div class="ach-badge ' + (unlocked ? 'unlocked' : 'locked') + '" title="' + t(a.nameKey) + '">' +
      '<i class="fa-solid ' + a.icon + '"></i> ' + t(a.nameKey) + '</div>';
  });
  el.innerHTML = html;
}

// --- 6. Command History Timeline ---
function renderCommandTimeline() {
  var el = document.getElementById('timeline-items');
  if (!el) return;
  var cmds = terminalState.commandHistory.filter(function(c) { return c !== 'clear' && c !== 'help'; });
  if (cmds.length === 0) { el.innerHTML = '<span style="color:#484f58;font-size:0.65rem">' + t('terminal.history.empty') + '</span>'; return; }
  var html = '';
  var shown = cmds.slice(-20);
  shown.forEach(function(c, i) {
    if (i > 0) html += '<span class="tl-arrow"><i class="fa-solid fa-chevron-right"></i></span>';
    html += '<span class="tl-item" data-cmd="' + c.replace(/"/g, '&quot;') + '">' + escapeHtml(c.length > 25 ? c.substring(0, 22) + '...' : c) + '</span>';
  });
  el.innerHTML = html;
  el.scrollLeft = el.scrollWidth;
  el.querySelectorAll('.tl-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var input = document.getElementById('terminal-input');
      if (input) { input.value = item.dataset.cmd; input.focus(); }
    });
  });
}

// --- 7. Multi-Tab Terminal ---
var terminalTabs = [{ id: 0, state: null, history: '' }];
var activeTabId = 0;
var nextTabId = 1;

function saveCurrentTab() {
  var tab = terminalTabs.find(function(t) { return t.id === activeTabId; });
  if (!tab) return;
  tab.state = JSON.parse(JSON.stringify(terminalState));
  var body = document.getElementById('playground-terminal');
  if (body) tab.history = body.innerHTML;
}

function switchTab(id) {
  saveCurrentTab();
  activeTabId = id;
  var tab = terminalTabs.find(function(t) { return t.id === id; });
  if (!tab) return;
  if (tab.state) {
    Object.assign(terminalState, tab.state);
  } else {
    terminalState = { initialized: false, branch: 'main', branches: ['main'], commits: [], staged: [], untracked: [], modified: [], files: {}, remotes: {}, stash: [], tags: [], commandHistory: [], historyIndex: -1 };
  }
  var body = document.getElementById('playground-terminal');
  if (body) body.innerHTML = tab.history || '';
  renderTabBar();
  renderTerminalState();
  renderCommandTimeline();
  renderAchievements();
}

function addTab() {
  var id = nextTabId++;
  terminalTabs.push({ id: id, state: null, history: '' });
  switchTab(id);
}

function renderTabBar() {
  var bar = document.getElementById('terminal-tab-bar');
  if (!bar) return;
  var html = '';
  terminalTabs.forEach(function(tab, i) {
    html += '<button class="term-tab' + (tab.id === activeTabId ? ' active' : '') + '" data-tab="' + tab.id + '">Terminal ' + (i + 1) + '</button>';
  });
  html += '<button class="term-tab-add" id="term-tab-add" title="New terminal">+</button>';
  bar.innerHTML = html;
  bar.querySelectorAll('.term-tab').forEach(function(btn) {
    btn.addEventListener('click', function() { switchTab(parseInt(btn.dataset.tab)); });
  });
  var addBtn = document.getElementById('term-tab-add');
  if (addBtn) addBtn.addEventListener('click', addTab);
}

// --- 8. Export Session ---
function exportSession() {
  var cmds = terminalState.commandHistory.filter(function(c) { return c !== 'clear' && c !== 'help' && c !== 'pwd'; });
  if (cmds.length === 0) return;
  var content = '#!/bin/bash\n# GitMaster Pro - Terminal Session Export\n# Date: ' + new Date().toISOString().split('T')[0] + '\n# Generated by GitMaster Pro (Dr. Mohammad Arafah)\n\n';
  cmds.forEach(function(c) { content += c + '\n'; });
  var blob = new Blob([content], { type: 'text/x-sh' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'git-session-' + new Date().toISOString().split('T')[0] + '.sh';
  a.click();
  URL.revokeObjectURL(a.href);
}

// --- Hook into processCommand for all enhancements ---
var _origProcessCommand = processCommand;
processCommand = function(input) {
  var result = _origProcessCommand(input);
  checkChallengeStep(input);
  renderTerminalState();
  renderCommandTimeline();
  updateAchievements();
  renderCommandBreakdown(input);
  return result;
};

// --- Enhanced Mistake Coach: override detectCommonMistake to return rich HTML ---
var _origDetectMistake = detectCommonMistake;
detectCommonMistake = function(cmd) {
  var mistakes = [
    { pattern: /^git add$/i, correct: 'git add .', hint: 'You need to specify which files to add. Use <code>git add .</code> to add all, or <code>git add &lt;file&gt;</code> for a specific file.' },
    { pattern: /^git commit$/i, correct: 'git commit -m "message"', hint: 'Commits require a message. Use <code>git commit -m "your message"</code>.' },
    { pattern: /^git commit -m$/i, correct: 'git commit -m "message"', hint: 'You forgot the commit message.' },
    { pattern: /^git commit -m [^"'][^\s]*$/i, correct: null, hint: 'Commit messages should be in quotes: <code>git commit -m "your message"</code>.' },
    { pattern: /^git push -f|git push --force$/i, correct: 'git push --force-with-lease', hint: '<span class="terminal-warning">Force push overwrites remote history!</span> Prefer <code>--force-with-lease</code>.' },
    { pattern: /^git checkout -b$/i, correct: 'git switch -c feature-name', hint: 'Specify a branch name: <code>git switch -c feature-name</code>.' },
    { pattern: /^git switch$/i, correct: 'git switch branch-name', hint: 'Specify which branch: <code>git switch main</code> or <code>git switch -c new-branch</code>.' },
    { pattern: /^git branch -d$/i, correct: 'git branch -d branch-name', hint: 'Specify the branch to delete.' },
    { pattern: /^git merge$/i, correct: 'git merge branch-name', hint: 'Specify the branch to merge.' },
    { pattern: /^git comit/i, correct: 'git commit -m "message"', hint: 'Typo: Did you mean <code>git commit</code>?' },
    { pattern: /^git stauts/i, correct: 'git status', hint: 'Typo: Did you mean <code>git status</code>?' },
    { pattern: /^git chekout/i, correct: 'git checkout', hint: 'Typo: Did you mean <code>git checkout</code>? Try <code>git switch</code>.' },
    { pattern: /^git pul$/i, correct: 'git pull', hint: 'Typo: Did you mean <code>git pull</code>?' },
    { pattern: /^git psuh/i, correct: 'git push', hint: 'Typo: Did you mean <code>git push</code>?' },
    { pattern: /^git inti/i, correct: 'git init', hint: 'Typo: Did you mean <code>git init</code>?' },
    { pattern: /^git brach/i, correct: 'git branch', hint: 'Typo: Did you mean <code>git branch</code>?' },
    { pattern: /^git checkout -- \./i, correct: 'git restore .', hint: 'Modern way: <code>git restore .</code> instead of <code>git checkout --</code>.' }
  ];
  for (var i = 0; i < mistakes.length; i++) {
    if (mistakes[i].pattern.test(cmd)) {
      return renderMistakeCoach(cmd, mistakes[i]);
    }
  }
  if (cmd === 'git') {
    return '<span class="terminal-info">Available git subcommands:</span>\n' +
      '  <span class="terminal-output">Setup:</span>      init, clone, config\n' +
      '  <span class="terminal-output">Basics:</span>     status, add, commit, diff, log\n' +
      '  <span class="terminal-output">Branching:</span>  branch, switch, checkout, merge, rebase\n' +
      '  <span class="terminal-output">Remote:</span>     remote, push, pull, fetch, clone\n' +
      '  <span class="terminal-output">Undo:</span>       restore, reset, revert, stash\n' +
      '  <span class="terminal-output">Inspect:</span>    log, show, blame, diff, reflog\n' +
      '  <span class="terminal-output">Tags:</span>       tag\n' +
      '  <span class="terminal-output">Advanced:</span>   cherry-pick, rebase, stash\n\n' +
      'Type a full command like <span class="terminal-info">git init</span> or <span class="terminal-info">git status</span>';
  }
  return null;
};

// --- Init all terminal enhancements ---
function initTerminalEnhancements() {
  setupChallengeLevelTabs();
  setupGuideControls();
  renderChallengeBar();
  renderTerminalState();
  renderAchievements();
  renderCommandTimeline();
  renderTabBar();

  var exportBtn = document.getElementById('btn-export-session');
  if (exportBtn) exportBtn.addEventListener('click', exportSession);

  var resetBtn = document.getElementById('btn-clear-terminal');
  if (resetBtn) resetBtn.addEventListener('click', function() {
    terminalState = { initialized: false, branch: 'main', branches: ['main'], commits: [], staged: [], untracked: [], modified: [], files: {}, remotes: {}, stash: [], tags: [], commandHistory: [], historyIndex: -1 };
    var body = document.getElementById('playground-terminal');
    if (body) body.innerHTML = '';
    renderTerminalState();
    renderCommandTimeline();
    renderAchievements();
    renderCommandBreakdown('');
    challengeProgress = 0;
    renderGuidePanel();
  });

  // Fix button delegation for mistake coach
  var body = document.getElementById('playground-terminal');
  if (body) body.addEventListener('click', function(e) {
    var fixBtn = e.target.closest('.mc-fix-btn');
    if (fixBtn) {
      var input = document.getElementById('terminal-input');
      if (input) { input.value = fixBtn.dataset.fix; input.focus(); }
    }
  });

  // Command breakdown on input
  var input = document.getElementById('terminal-input');
  if (input) {
    input.addEventListener('input', function() { renderCommandBreakdown(input.value); });
    input.addEventListener('focus', function() { renderCommandBreakdown(input.value); });
    input.addEventListener('blur', function() {
      setTimeout(function() { var el = document.getElementById('cmd-breakdown'); if (el) { el.innerHTML = ''; el.classList.remove('active'); } }, 200);
    });
  }
}

// ==================== GIT GRAPH VISUALIZER ====================
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r];
    var tl = r[0], tr = r[1] || tl, br = r[2] || tl, bl = r[3] || tl;
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

class GitGraphVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.branchColors = { main: '#10b981', feature: '#8B5CF6', develop: '#6E33D6', hotfix: '#ef4444', release: '#f59e0b' };
    this.branchY = { main: 200 };
    this.nextX = 80;
    this.branchCount = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width = parent ? parent.clientWidth - 40 : 800;
    this.canvas.height = 400;
    this.render();
  }

  init() {
    this.nodes = [];
    this.edges = [];
    this.branchY = { main: 200 };
    this.nextX = 80;
    this.branchCount = 0;
    const hash = generateHash().substring(0, 7);
    this.nodes.push({ x: this.nextX, y: 200, hash, message: 'Initial commit', branch: 'main', color: this.branchColors.main });
    this.nextX += 130;
    this.render();
    this.updateInfo('Repository initialized with initial commit on main branch.');
  }

  addCommit(message, branch) {
    if (!branch) branch = 'main';
    const color = this.branchColors[branch] || this.branchColors.main;
    const y = this.branchY[branch] || 200;
    const hash = generateHash().substring(0, 7);
    const node = { x: this.nextX, y, hash, message: message || 'New commit', branch, color };

    if (this.nodes.length > 0) {
      const prev = [...this.nodes].reverse().find(n => n.branch === branch);
      if (prev) this.edges.push({ from: prev, to: node, color });
    }

    this.nodes.push(node);
    this.nextX += 130;
    if (this.nextX > this.canvas.width - 80) {
      this.canvas.width += 250;
    }
    this.render();
    this.updateInfo('Commit ' + hash + ' added to ' + branch + ': "' + (message || 'New commit') + '"');
  }

  createBranch(name) {
    if (!name) name = 'feature';
    if (this.branchY[name]) { this.updateInfo('Branch "' + name + '" already exists.'); return; }
    this.branchCount++;
    const yOffset = this.branchCount % 2 === 0 ? -80 * Math.ceil(this.branchCount / 2) : 80 * Math.ceil(this.branchCount / 2);
    this.branchY[name] = 200 + yOffset;
    const colorKeys = Object.keys(this.branchColors);
    const color = this.branchColors[name] || this.branchColors[colorKeys[this.branchCount % colorKeys.length]] || '#8B5CF6';
    this.branchColors[name] = color;

    const lastMain = [...this.nodes].reverse().find(n => n.branch === 'main');
    if (lastMain) {
      const branchNode = { x: this.nextX, y: this.branchY[name], hash: generateHash().substring(0, 7), message: 'Branch: ' + name, branch: name, color };
      this.edges.push({ from: lastMain, to: branchNode, color, dashed: true });
      this.nodes.push(branchNode);
      this.nextX += 130;
    }
    if (this.nextX > this.canvas.width - 80) this.canvas.width += 250;
    this.render();
    this.updateInfo('Branch "' + name + '" created from main.');
  }

  merge(from, to) {
    if (!from) from = 'feature';
    if (!to) to = 'main';
    const fromNode = [...this.nodes].reverse().find(n => n.branch === from);
    if (!fromNode) { this.updateInfo('Branch "' + from + '" not found.'); return; }
    const toColor = this.branchColors[to] || '#10b981';
    const mergeNode = { x: this.nextX, y: this.branchY[to] || 200, hash: generateHash().substring(0, 7), message: 'Merge ' + from + ' into ' + to, branch: to, color: toColor };

    const prevTo = [...this.nodes].reverse().find(n => n.branch === to);
    if (prevTo) this.edges.push({ from: prevTo, to: mergeNode, color: toColor });
    this.edges.push({ from: fromNode, to: mergeNode, color: this.branchColors[from] || '#8B5CF6', dashed: true });

    this.nodes.push(mergeNode);
    this.nextX += 130;
    if (this.nextX > this.canvas.width - 80) this.canvas.width += 250;
    this.render();
    this.updateInfo('Merged "' + from + '" into "' + to + '".');
  }

  reset() {
    this.nodes = []; this.edges = [];
    this.branchY = { main: 200 }; this.nextX = 80; this.branchCount = 0;
    this.canvas.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth - 40 : 800;
    this.render();
    this.updateInfo('Graph cleared.');
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background — always dark to match the dark visualizer section
    ctx.fillStyle = '#0a0514';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Branch lines
    Object.entries(this.branchY).forEach(([name, y]) => {
      ctx.beginPath();
      ctx.strokeStyle = (this.branchColors[name] || '#888') + '30';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(60, y);
      ctx.lineTo(this.canvas.width - 30, y);
      ctx.stroke();
      ctx.setLineDash([]);
      // Branch label with background pill
      ctx.font = 'bold 11px Inter, sans-serif';
      var labelColor = this.branchColors[name] || '#888';
      var textW = ctx.measureText(name).width;
      var pillW = textW + 12, pillH = 20, pillX = 5, pillY = y - 26;
      ctx.fillStyle = labelColor + '25';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 4);
      ctx.fill();
      ctx.fillStyle = labelColor;
      ctx.textAlign = 'left';
      ctx.fillText(name, pillX + 6, pillY + 14);
    });

    // Edges
    this.edges.forEach(edge => {
      ctx.beginPath();
      ctx.strokeStyle = edge.color || '#888';
      ctx.lineWidth = 3;
      if (edge.dashed) ctx.setLineDash([6, 4]);
      else ctx.setLineDash([]);
      if (edge.from.y === edge.to.y) {
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
      } else {
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.bezierCurveTo(edge.from.x + 40, edge.from.y, edge.to.x - 40, edge.to.y, edge.to.x, edge.to.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Nodes
    this.nodes.forEach((node, i) => {
      // Glow
      ctx.beginPath();
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 25);
      glow.addColorStop(0, node.color + '40');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Hash text
      ctx.font = 'bold 9px Fira Code, monospace';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(node.hash.substring(0, 5), node.x, node.y + 3);

      // Message below
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.textAlign = 'center';
      const msg = node.message.length > 28 ? node.message.substring(0, 26) + '..' : node.message;
      ctx.fillText(msg, node.x, node.y + 35);

      // HEAD pointer on last node
      if (i === this.nodes.length - 1) {
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('HEAD', node.x, node.y - 25);
      }
    });
  }

  updateInfo(text) {
    const info = document.getElementById('visualizer-info');
    if (info) info.textContent = text;
  }
}

let gitGraph = null;

// === Custom inline input for visualizer (replaces browser prompt) ===
function showVizInput(label, defaultVal, callback) {
  var existing = document.querySelector('.viz-input-panel');
  if (existing) existing.remove();
  var panel = document.createElement('div');
  panel.className = 'viz-input-panel';
  panel.innerHTML =
    '<div class="viz-input-inner">' +
      '<label class="viz-input-label">' + label + '</label>' +
      '<input type="text" class="viz-input-field" value="' + escapeHtml(defaultVal) + '" />' +
      '<button class="viz-input-ok"><i class="fa-solid fa-check"></i></button>' +
      '<button class="viz-input-cancel"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>';
  var container = document.querySelector('.visualizer-controls');
  container.parentElement.insertBefore(panel, container.nextSibling);
  var input = panel.querySelector('input');
  input.focus();
  input.select();
  function submit() {
    var val = input.value.trim();
    panel.remove();
    if (val) callback(val);
  }
  panel.querySelector('.viz-input-ok').addEventListener('click', submit);
  panel.querySelector('.viz-input-cancel').addEventListener('click', function() { panel.remove(); });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Escape') panel.remove();
  });
}

function showVizCommitInput(branches, callback) {
  var existing = document.querySelector('.viz-input-panel');
  if (existing) existing.remove();
  var panel = document.createElement('div');
  panel.className = 'viz-input-panel';
  var selectHtml = '<select class="viz-input-select">';
  branches.forEach(function(b) { selectHtml += '<option value="' + b + '">' + b + '</option>'; });
  selectHtml += '</select>';
  panel.innerHTML =
    '<div class="viz-input-inner">' +
      '<label class="viz-input-label">' + t('viz.commit.branch') + '</label>' +
      selectHtml +
      '<label class="viz-input-label">' + t('viz.commit.message') + '</label>' +
      '<input type="text" class="viz-input-field" value="Commit ' + (gitGraph ? gitGraph.nodes.length + 1 : 1) + '" />' +
      '<button class="viz-input-ok"><i class="fa-solid fa-check"></i></button>' +
      '<button class="viz-input-cancel"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>';
  var container = document.querySelector('.visualizer-controls');
  container.parentElement.insertBefore(panel, container.nextSibling);
  var input = panel.querySelector('input');
  input.focus();
  input.select();
  function submit() {
    var msg = input.value.trim();
    var branch = panel.querySelector('select').value;
    panel.remove();
    if (msg) callback(msg, branch);
  }
  panel.querySelector('.viz-input-ok').addEventListener('click', submit);
  panel.querySelector('.viz-input-cancel').addEventListener('click', function() { panel.remove(); });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Escape') panel.remove();
  });
}

// === Workflow status panel for visualizer ===
function renderWorkflowStatusPanel(state) {
  var panel = document.getElementById('viz-workflow-status');
  if (!panel) return;
  var areas = [
    { key: 'working', label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6' },
    { key: 'staging', label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b' },
    { key: 'local', label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
    { key: 'remote', label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9' }
  ];
  var arrows = ['git add', 'git commit', 'git push'];
  var html = '';
  areas.forEach(function(area, i) {
    var active = state[area.key] ? ' viz-status-active' : '';
    var highlight = state.highlight === area.key ? ' viz-status-highlight' : '';
    html += '<div class="viz-status-area' + active + highlight + '" style="--area-color:' + area.color + '">' +
      '<i class="fa-solid ' + area.icon + '"></i>' +
      '<span>' + area.label + '</span></div>';
    if (i < areas.length - 1) {
      var arrowActive = state.arrow === i ? ' viz-arrow-active' : '';
      html += '<div class="viz-status-arrow' + arrowActive + '">' +
        '<span>' + arrows[i] + '</span>' +
        '<i class="fa-solid fa-arrow-right"></i></div>';
    }
  });
  panel.innerHTML = html;
}

function renderNextSteps(steps) {
  var panel = document.getElementById('viz-next-steps');
  if (!panel) return;
  if (!steps || steps.length === 0) { panel.innerHTML = ''; return; }
  var html = '<div class="viz-next-header"><i class="fa-solid fa-lightbulb"></i> ' + t('viz.nextsteps') + '</div><div class="viz-next-list">';
  steps.forEach(function(s) {
    if (typeof s === 'object' && s.action) {
      html += '<button class="viz-next-btn" data-action="' + s.action + '"' +
        (s.param ? ' data-param="' + escapeHtml(s.param) + '"' : '') +
        '><i class="fa-solid fa-play"></i> ' + s.label + '</button>';
    } else {
      html += '<div class="viz-next-item"><i class="fa-solid fa-chevron-right"></i> ' + s + '</div>';
    }
  });
  html += '</div>';
  panel.innerHTML = html;
  panel.querySelectorAll('.viz-next-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { executeNextStep(btn.dataset.action, btn.dataset.param); });
  });
}

function executeNextStep(action, param) {
  if (!gitGraph) return;
  if (action === 'add') {
    renderWorkflowStatusPanel({ working: true, staging: true, highlight: 'staging', arrow: 0 });
    gitGraph.updateInfo(currentLang === 'ar' ? 'تم تجهيز الملفات في منطقة التجهيز' : 'Files staged in the staging area');
    renderNextSteps([
      { label: t('viz.next.commit'), action: 'commit' },
      { label: t('viz.next.createBranch'), action: 'branch' }
    ]);
  }
  else if (action === 'commit') {
    var branches = Object.keys(gitGraph.branchY);
    showVizCommitInput(branches, function(msg, branch) {
      gitGraph.addCommit(msg, branch);
      renderWorkflowStatusPanel({ working: true, staging: true, local: true, highlight: 'local', arrow: 1 });
      renderNextSteps([
        { label: t('viz.next.createBranch'), action: 'branch' },
        { label: t('viz.next.push'), action: 'push' },
        { label: t('viz.next.moreCommits'), action: 'commit' }
      ]);
    });
  }
  else if (action === 'branch') {
    showVizInput(
      currentLang === 'ar' ? 'اسم الفرع:' : 'Branch name:',
      param || 'feature',
      function(name) {
        gitGraph.createBranch(name);
        renderWorkflowStatusPanel({ working: true, local: true, highlight: 'local' });
        renderNextSteps([
          { label: t('viz.next.commitBranch').replace('{branch}', name), action: 'commit' },
          { label: t('viz.next.switchBranch'), action: 'switch' },
          { label: t('viz.next.mergeLater'), action: 'merge', param: name }
        ]);
      }
    );
  }
  else if (action === 'push') {
    renderWorkflowStatusPanel({ working: true, staging: true, local: true, remote: true, highlight: 'remote', arrow: 2 });
    gitGraph.updateInfo(currentLang === 'ar' ? 'تم دفع التغييرات إلى المستودع البعيد' : 'Changes pushed to remote repository');
    renderNextSteps([
      { label: t('viz.next.createBranch'), action: 'branch' },
      { label: t('viz.next.moreCommits'), action: 'commit' },
      { label: t('viz.next.newFeature'), action: 'branch', param: 'feature-new' }
    ]);
  }
  else if (action === 'merge') {
    var from = param || 'feature';
    if (gitGraph.branchY[from]) {
      gitGraph.merge(from, 'main');
      renderWorkflowStatusPanel({ working: true, staging: true, local: true, highlight: 'local' });
      renderNextSteps([
        { label: t('viz.next.push'), action: 'push' },
        { label: t('viz.next.deleteBranch'), action: 'deleteBranch' },
        { label: t('viz.next.newFeature'), action: 'branch', param: 'feature-next' }
      ]);
    } else {
      showVizInput(
        currentLang === 'ar' ? 'دمج من فرع:' : 'Merge from branch:',
        from,
        function(name) {
          gitGraph.merge(name, 'main');
          renderWorkflowStatusPanel({ working: true, staging: true, local: true, highlight: 'local' });
          renderNextSteps([
            { label: t('viz.next.push'), action: 'push' },
            { label: t('viz.next.deleteBranch'), action: 'deleteBranch' },
            { label: t('viz.next.newFeature'), action: 'branch', param: 'feature-next' }
          ]);
        }
      );
    }
  }
  else if (action === 'switch') {
    var branches = Object.keys(gitGraph.branchY);
    var info = currentLang === 'ar' ? 'الفروع المتاحة: ' : 'Available branches: ';
    gitGraph.updateInfo(info + branches.join(', '));
    renderNextSteps([
      { label: t('viz.next.commit'), action: 'commit' },
      { label: t('viz.next.createBranch'), action: 'branch' }
    ]);
  }
  else if (action === 'deleteBranch') {
    gitGraph.updateInfo(currentLang === 'ar' ? 'تم حذف الفرع المدموج' : 'Merged branch deleted');
    renderNextSteps([
      { label: t('viz.next.newFeature'), action: 'branch', param: 'feature-v2' },
      { label: t('viz.next.push'), action: 'push' }
    ]);
  }
}

// === Before/After step visualization for module steps ===
function renderStepDiagram(step) {
  if (!step.commands) return '';
  var cmd = (step.commands.windows || '');
  var viz = getStepVisualization(cmd);
  if (!viz) return '';

  var beforeLabel = currentLang === 'ar' ? 'قبل' : 'Before';
  var afterLabel = currentLang === 'ar' ? 'بعد' : 'After';

  var html = '<div class="step-diagram">';
  html += '<div class="step-diagram-label"><i class="fa-solid fa-project-diagram"></i> ' + t('viz.diagram') + '</div>';

  // Before state
  html += '<div class="step-before-after">';
  html += '<div class="ba-column ba-before">';
  html += '<div class="ba-label">' + beforeLabel + '</div>';
  html += renderBAState(viz.before);
  html += '</div>';

  // Arrow with command name
  html += '<div class="ba-arrow-col">';
  html += '<div class="ba-cmd">' + escapeHtml(viz.cmd) + '</div>';
  html += '<div class="ba-arrow-line"><i class="fa-solid fa-arrow-right"></i></div>';
  html += '</div>';

  // After state
  html += '<div class="ba-column ba-after">';
  html += '<div class="ba-label">' + afterLabel + '</div>';
  html += renderBAState(viz.after);
  html += '</div>';
  html += '</div>';

  // Flow path
  if (viz.flow) {
    html += '<div class="mini-flow">';
    viz.flow.forEach(function(item) {
      if (item.area) {
        var cls = 'mini-flow-area';
        if (item.active) cls += ' mini-flow-active';
        if (item.highlight) cls += ' mini-flow-highlight';
        html += '<div class="' + cls + '" style="--area-color:' + item.area.color + '">' +
          '<div class="mini-flow-icon"><i class="fa-solid ' + item.area.icon + '"></i></div>' +
          '<div class="mini-flow-label">' + item.area.label + '</div></div>';
      } else if (item.arrow !== undefined) {
        var aCls = 'mini-flow-arrow' + (item.active ? ' mini-flow-arrow-active' : '');
        html += '<div class="' + aCls + '">' +
          '<div class="mini-flow-arrow-label">' + item.arrow + '</div>' +
          '<i class="fa-solid fa-arrow-right"></i></div>';
      }
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function renderBAState(state) {
  if (!state) return '';
  var html = '<div class="ba-areas">';
  if (state.areas) state.areas.forEach(function(a) {
    var cls = 'ba-area' + (a.changed ? ' ba-changed' : '') + (a.new ? ' ba-new' : '') + (a.removed ? ' ba-removed' : '');
    html += '<div class="' + cls + '" style="--area-color:' + a.color + '">' +
      '<i class="fa-solid ' + a.icon + '"></i>' +
      '<span>' + a.label + '</span>';
    if (a.files && a.files.length) {
      html += '<div class="ba-files">';
      a.files.forEach(function(f) {
        var fCls = 'ba-file' + (f.status ? ' ba-file-' + f.status : '');
        html += '<div class="' + fCls + '">' + escapeHtml(f.name) + '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
  });
  if (state.branches) {
    html += '<div class="ba-branches">';
    state.branches.forEach(function(b) {
      var bCls = 'ba-branch' + (b.new ? ' ba-branch-new' : '');
      html += '<div class="' + bCls + '" style="--branch-color:' + (b.color || '#888') + '">' +
        '<i class="fa-solid fa-code-branch"></i> ' + b.name +
        (b.active ? ' <i class="fa-solid fa-circle" style="font-size:6px;color:#10b981"></i>' : '') +
        '</div>';
    });
    html += '</div>';
  }
  if (state.commits) {
    html += '<div class="ba-commits">';
    state.commits.forEach(function(c) {
      var cCls = 'ba-commit' + (c.new ? ' ba-commit-new' : '') + (c.removed ? ' ba-commit-removed' : '');
      html += '<div class="' + cCls + '"><span class="ba-hash">' + (c.hash || '') + '</span> ' + escapeHtml(c.msg) + '</div>';
    });
    html += '</div>';
  }
  return html + '</div>';
}

function getStepVisualization(cmd) {
  var W = { key: 'working', label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6' };
  var S = { key: 'staging', label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b' };
  var L = { key: 'local', label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' };
  var R = { key: 'remote', label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9' };
  var ST = { key: 'stash', label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6' };
  var lc = cmd.toLowerCase();

  // git init
  if (lc.includes('git init') && !lc.includes('config')) {
    return {
      cmd: 'git init',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'my-project/', status: 'normal' }] }] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'my-project/', status: 'normal' }] },
        { label: '.git/', icon: 'fa-database', color: '#10b981', new: true, files: [{ name: 'HEAD, config, objects/', status: 'new' }] }
      ] },
      flow: [{ area: W, active: true }, { arrow: 'git init', active: true }, { area: L, active: true, highlight: true }]
    };
  }
  // git clone
  if (lc.includes('git clone')) {
    return {
      cmd: 'git clone',
      before: { areas: [{ label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'repo (remote)', status: 'normal' }] }] },
      after: { areas: [
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'repo (remote)', status: 'normal' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', new: true, files: [{ name: 'repo (local copy)', status: 'new' }] },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', new: true, files: [{ name: 'all files', status: 'new' }] }
      ] },
      flow: [{ area: R, active: true, highlight: true }, { arrow: 'git clone', active: true }, { area: L, active: true, highlight: true }, { arrow: '', active: false }, { area: W, active: true }]
    };
  }
  // git add + git commit combo
  if (lc.includes('git add') && lc.includes('git commit') && !lc.includes('remote add')) {
    return {
      cmd: 'git add + git commit',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'modified files', status: 'modified' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'clean', status: 'normal' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', changed: true, files: [{ name: 'new commit created', status: 'new' }] }
      ] },
      flow: [{ area: W, active: true }, { arrow: 'git add', active: true }, { area: S, active: true }, { arrow: 'git commit', active: true }, { area: L, active: true, highlight: true }]
    };
  }
  // git add
  if (lc.includes('git add') && !lc.includes('remote add')) {
    return {
      cmd: 'git add',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'untracked/modified', status: 'modified' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'untracked/modified', status: 'normal' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', changed: true, files: [{ name: 'files staged', status: 'new' }] }
      ] },
      flow: [{ area: W, active: true, highlight: true }, { arrow: 'git add', active: true }, { area: S, active: true, highlight: true }]
    };
  }
  // git commit
  if (lc.includes('git commit')) {
    return {
      cmd: 'git commit',
      before: { areas: [
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: 'staged files', status: 'modified' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }
      ],
        commits: [{ hash: 'a1b2c3d', msg: 'Previous commit' }]
      },
      after: { areas: [
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', changed: true }
      ],
        commits: [{ hash: 'a1b2c3d', msg: 'Previous commit' }, { hash: 'd4e5f6a', msg: 'New commit', new: true }]
      },
      flow: [{ area: S, active: true, highlight: true }, { arrow: 'git commit', active: true }, { area: L, active: true, highlight: true }]
    };
  }
  // git push
  if (lc.includes('git push')) {
    return {
      cmd: 'git push',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: '2 new commits', status: 'modified' }] },
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'behind', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'in sync', status: 'normal' }] },
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', changed: true, files: [{ name: 'updated', status: 'new' }] }
      ] },
      flow: [{ area: L, active: true, highlight: true }, { arrow: 'git push', active: true }, { area: R, active: true, highlight: true }]
    };
  }
  // git pull
  if (lc.includes('git pull')) {
    return {
      cmd: 'git pull',
      before: { areas: [
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'new changes', status: 'modified' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'behind', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'source', status: 'normal' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', changed: true, files: [{ name: 'updated', status: 'new' }] },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: [{ name: 'files updated', status: 'new' }] }
      ] },
      flow: [{ area: R, active: true, highlight: true }, { arrow: 'git pull', active: true }, { area: L, active: true, highlight: true }, { arrow: '', active: false }, { area: W, active: true }]
    };
  }
  // git fetch
  if (lc.includes('git fetch')) {
    return {
      cmd: 'git fetch',
      before: { areas: [
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'new changes', status: 'modified' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'behind', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'source', status: 'normal' }] },
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', changed: true, files: [{ name: 'origin/main updated', status: 'new' }] }
      ] },
      flow: [{ area: R, active: true, highlight: true }, { arrow: 'git fetch', active: true }, { area: L, active: true, highlight: true }]
    };
  }
  // git status
  if (lc.includes('git status')) {
    return {
      cmd: 'git status',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: '???', status: 'modified' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '???', status: 'modified' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'modified: file.txt', status: 'modified' }, { name: 'untracked: new.js', status: 'new' }] },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: 'staged: readme.md', status: 'new' }] }
      ] }
    };
  }
  // git log
  if (lc.includes('git log') || lc.includes('git reflog')) {
    return {
      cmd: lc.includes('reflog') ? 'git reflog' : 'git log',
      before: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'a1b2c3d', msg: '?' }, { hash: '???????', msg: '?' }, { hash: '???????', msg: '?' }]
      },
      after: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'a1b2c3d', msg: 'Initial commit' }, { hash: 'd4e5f6a', msg: 'Update README' }, { hash: 'e5f6g7h', msg: 'HEAD', new: true }]
      }
    };
  }
  // git diff
  if (lc.includes('git diff')) {
    return {
      cmd: lc.includes('--staged') ? 'git diff --staged' : 'git diff',
      before: { areas: [
        { label: lc.includes('--staged') ? t('viz.area.staging') : t('viz.area.working'), icon: lc.includes('--staged') ? 'fa-layer-group' : 'fa-folder-open', color: lc.includes('--staged') ? '#f59e0b' : '#8B5CF6', files: [{ name: 'changes hidden', status: 'modified' }] }
      ] },
      after: { areas: [
        { label: lc.includes('--staged') ? t('viz.area.staging') : t('viz.area.working'), icon: lc.includes('--staged') ? 'fa-layer-group' : 'fa-folder-open', color: lc.includes('--staged') ? '#f59e0b' : '#8B5CF6', files: [{ name: '+ added lines', status: 'new' }, { name: '- removed lines', status: 'removed' }] }
      ] }
    };
  }
  // git show / git blame
  if (lc.includes('git show') || lc.includes('git blame')) {
    return {
      cmd: lc.includes('blame') ? 'git blame' : 'git show',
      before: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'd4e5f6a', msg: 'commit data' }]
      },
      after: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'd4e5f6a', msg: lc.includes('blame') ? 'line-by-line author info' : 'full diff + metadata', new: true }]
      }
    };
  }
  // git branch (create)
  if (lc.includes('git branch') && !lc.includes('-d') && !lc.includes('-D') && !lc.includes('-r') && !lc.includes('-a') && !lc.includes('--set')) {
    var bname = 'feature';
    var parts = cmd.match(/git branch\s+(\S+)/i);
    if (parts) bname = parts[1];
    return {
      cmd: 'git branch',
      before: { branches: [{ name: 'main', color: '#10b981', active: true }] },
      after: { branches: [{ name: 'main', color: '#10b981', active: true }, { name: bname, color: '#6E33D6', new: true }] }
    };
  }
  // git branch -d (delete)
  if (lc.includes('git branch -d') || lc.includes('git branch -D')) {
    var dname = 'feature';
    var dparts = cmd.match(/git branch\s+-[dD]\s+(\S+)/i);
    if (dparts) dname = dparts[1];
    return {
      cmd: 'git branch -d',
      before: { branches: [{ name: 'main', color: '#10b981', active: true }, { name: dname, color: '#6E33D6' }] },
      after: { branches: [{ name: 'main', color: '#10b981', active: true }] }
    };
  }
  // git switch / git checkout (branch)
  if (lc.includes('git switch') || (lc.includes('git checkout') && !lc.includes('--'))) {
    var isNew = lc.includes('-c ') || lc.includes('-b ');
    var sname = 'feature';
    var sparts = cmd.match(/(?:switch|checkout)\s+(?:-[cb]\s+)?(\S+)/i);
    if (sparts) sname = sparts[1];
    return {
      cmd: isNew ? 'git switch -c' : 'git switch',
      before: { branches: [{ name: 'main', color: '#10b981', active: true }].concat(isNew ? [] : [{ name: sname, color: '#6E33D6' }]) },
      after: { branches: [{ name: 'main', color: '#10b981' }].concat([{ name: sname, color: '#6E33D6', active: true, new: isNew }]) }
    };
  }
  // git merge
  if (lc.includes('git merge') && !lc.includes('--abort')) {
    var mfrom = 'feature';
    var mparts = cmd.match(/git merge\s+(\S+)/i);
    if (mparts) mfrom = mparts[1];
    return {
      cmd: 'git merge',
      before: {
        branches: [{ name: 'main', color: '#10b981', active: true }, { name: mfrom, color: '#6E33D6' }],
        commits: [{ hash: 'abc1234', msg: mfrom + ' commit' }]
      },
      after: {
        branches: [{ name: 'main', color: '#10b981', active: true }, { name: mfrom, color: '#6E33D6' }],
        commits: [{ hash: 'abc1234', msg: mfrom + ' commit' }, { hash: 'e5f6g7h', msg: 'Merge ' + mfrom, new: true }]
      }
    };
  }
  // git merge --abort
  if (lc.includes('merge --abort')) {
    return {
      cmd: 'git merge --abort',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'CONFLICT markers', status: 'removed' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'clean (pre-merge)', status: 'normal' }] }] }
    };
  }
  // git rebase
  if (lc.includes('git rebase') && !lc.includes('--abort')) {
    return {
      cmd: lc.includes('-i') ? 'git rebase -i' : 'git rebase',
      before: {
        branches: [{ name: 'main', color: '#10b981' }, { name: 'feature', color: '#6E33D6', active: true }],
        commits: [{ hash: 'a1b', msg: 'old base' }, { hash: 'd4e', msg: 'feature work' }]
      },
      after: {
        branches: [{ name: 'main', color: '#10b981' }, { name: 'feature', color: '#6E33D6', active: true }],
        commits: [{ hash: 'x9y', msg: 'new base' }, { hash: 'z8w', msg: 'feature (rebased)', new: true }]
      }
    };
  }
  // git rebase --abort
  if (lc.includes('rebase --abort')) {
    return {
      cmd: 'git rebase --abort',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'rebase in progress', status: 'removed' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'restored original', status: 'normal' }] }] }
    };
  }
  // git stash (save)
  if (lc.includes('git stash') && !lc.includes('pop') && !lc.includes('apply') && !lc.includes('list') && !lc.includes('drop')) {
    return {
      cmd: 'git stash',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'uncommitted changes', status: 'modified' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'clean', status: 'normal' }] },
        { label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', new: true, files: [{ name: 'stash@{0}: saved', status: 'new' }] }
      ] },
      flow: [{ area: W, active: true, highlight: true }, { arrow: 'git stash', active: true }, { area: ST, active: true, highlight: true }]
    };
  }
  // git stash list
  if (lc.includes('stash list')) {
    return {
      cmd: 'git stash list',
      before: { areas: [{ label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: '???', status: 'modified' }] }] },
      after: { areas: [{ label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: 'stash@{0}: WIP', status: 'normal' }, { name: 'stash@{1}: feature', status: 'normal' }] }] }
    };
  }
  // git stash pop / apply
  if (lc.includes('stash pop') || lc.includes('stash apply')) {
    return {
      cmd: lc.includes('pop') ? 'git stash pop' : 'git stash apply',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'clean', status: 'normal' }] },
        { label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: 'stash@{0}: saved', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: [{ name: 'changes restored', status: 'new' }] },
        { label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: lc.includes('pop') ? '(removed)' : 'stash@{0}: kept', status: lc.includes('pop') ? 'removed' : 'normal' }] }
      ] },
      flow: [{ area: ST, active: true, highlight: true }, { arrow: lc.includes('pop') ? 'stash pop' : 'stash apply', active: true }, { area: W, active: true, highlight: true }]
    };
  }
  // git stash drop
  if (lc.includes('stash drop')) {
    return {
      cmd: 'git stash drop',
      before: { areas: [{ label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: 'stash@{0}: saved', status: 'normal' }] }] },
      after: { areas: [{ label: 'Stash', icon: 'fa-box-archive', color: '#6E33D6', files: [{ name: '(deleted)', status: 'removed' }] }] }
    };
  }
  // git restore --staged
  if (lc.includes('git restore --staged')) {
    return {
      cmd: 'git restore --staged',
      before: { areas: [
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: 'file.txt (staged)', status: 'new' }] },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6' }
      ] },
      after: { areas: [
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: [{ name: 'file.txt (unstaged)', status: 'modified' }] }
      ] },
      flow: [{ area: S, active: true, highlight: true }, { arrow: 'restore --staged', active: true }, { area: W, active: true, highlight: true }]
    };
  }
  // git restore
  if (lc.includes('git restore') && !lc.includes('--staged')) {
    return {
      cmd: 'git restore',
      before: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'file.txt (modified)', status: 'modified' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'file.txt (original)', status: 'normal' }] }
      ] },
      flow: [{ area: L, active: true }, { arrow: 'git restore', active: true }, { area: W, active: true, highlight: true }]
    };
  }
  // git reset --soft
  if (lc.includes('git reset --soft')) {
    return {
      cmd: 'git reset --soft',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2' }] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.staging'), icon: 'fa-layer-group', color: '#f59e0b', changed: true, files: [{ name: 'changes kept here', status: 'new' }] }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2', removed: true }] },
      flow: [{ area: L, active: true, highlight: true }, { arrow: 'reset --soft', active: true }, { area: S, active: true, highlight: true }]
    };
  }
  // git reset --hard
  if (lc.includes('git reset --hard')) {
    return {
      cmd: 'git reset --hard',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'changes exist', status: 'modified' }] }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2' }] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'ALL GONE', status: 'removed' }] }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2', removed: true }] },
      flow: [{ area: L, active: true, highlight: true }, { arrow: 'reset --hard', active: true }, { area: W, active: true, highlight: true }]
    };
  }
  // git reset (mixed)
  if (lc.includes('git reset') && !lc.includes('--soft') && !lc.includes('--hard')) {
    return {
      cmd: 'git reset',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6' }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2' }] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' },
        { label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: [{ name: 'changes unstaged', status: 'modified' }] }
      ], commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'commit 2', removed: true }] },
      flow: [{ area: L, active: true, highlight: true }, { arrow: 'git reset', active: true }, { area: W, active: true, highlight: true }]
    };
  }
  // git revert
  if (lc.includes('git revert')) {
    return {
      cmd: 'git revert',
      before: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'bad commit' }]
      },
      after: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', changed: true }],
        commits: [{ hash: 'a1b', msg: 'commit 1' }, { hash: 'd4e', msg: 'bad commit' }, { hash: 'r1s2', msg: 'Revert "bad commit"', new: true }]
      }
    };
  }
  // git cherry-pick
  if (lc.includes('git cherry-pick')) {
    return {
      cmd: 'git cherry-pick',
      before: {
        branches: [{ name: 'main', color: '#10b981', active: true }, { name: 'feature', color: '#6E33D6' }],
        commits: [{ hash: 'a1b', msg: 'main commit' }]
      },
      after: {
        branches: [{ name: 'main', color: '#10b981', active: true }, { name: 'feature', color: '#6E33D6' }],
        commits: [{ hash: 'a1b', msg: 'main commit' }, { hash: 'x9y', msg: 'cherry-picked', new: true }]
      }
    };
  }
  // git remote add / remote -v
  if (lc.includes('git remote add') || lc.includes('git remote -v') || lc.includes('git remote')) {
    return {
      cmd: 'git remote',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'no remote', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'local repo', status: 'normal' }] },
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', new: true, files: [{ name: 'origin → github.com', status: 'new' }] }
      ] },
      flow: [{ area: L, active: true }, { arrow: 'remote', active: true }, { area: R, active: true, highlight: true }]
    };
  }
  // git tag
  if (lc.includes('git tag')) {
    return {
      cmd: 'git tag',
      before: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'd4e5f6a', msg: 'latest commit' }]
      },
      after: { areas: [{ label: t('viz.area.local'), icon: 'fa-database', color: '#10b981' }],
        commits: [{ hash: 'd4e5f6a', msg: 'latest commit' }],
        branches: [{ name: 'v1.0', color: '#059669', new: true }]
      }
    };
  }
  // git config
  if (lc.includes('git config')) {
    return {
      cmd: 'git config',
      before: { areas: [{ label: '~/.gitconfig', icon: 'fa-gear', color: '#8B5CF6', files: [{ name: 'settings...', status: 'normal' }] }] },
      after: { areas: [{ label: '~/.gitconfig', icon: 'fa-gear', color: '#8B5CF6', changed: true, files: [{ name: 'setting updated', status: 'new' }] }] }
    };
  }
  // git version
  if (lc.includes('git --version') || lc.includes('git version')) {
    return {
      cmd: 'git --version',
      before: { areas: [{ label: 'System', icon: 'fa-desktop', color: '#8B5CF6', files: [{ name: 'Git installed?', status: 'modified' }] }] },
      after: { areas: [{ label: 'System', icon: 'fa-desktop', color: '#8B5CF6', files: [{ name: 'Git v2.43.0 ✓', status: 'normal' }] }] }
    };
  }
  // .gitignore
  if (lc.includes('.gitignore')) {
    return {
      cmd: '.gitignore',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'all files tracked', status: 'modified' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'node_modules/ ✗', status: 'removed' }, { name: '.env ✗', status: 'removed' }, { name: 'src/ ✓', status: 'normal' }] }] }
    };
  }
  // ssh-keygen
  if (lc.includes('ssh-keygen')) {
    return {
      cmd: 'ssh-keygen',
      before: { areas: [{ label: '~/.ssh/', icon: 'fa-key', color: '#f59e0b', files: [{ name: '(empty)', status: 'normal' }] }] },
      after: { areas: [{ label: '~/.ssh/', icon: 'fa-key', color: '#f59e0b', changed: true, files: [{ name: 'id_ed25519 (private)', status: 'new' }, { name: 'id_ed25519.pub (public)', status: 'new' }] }] }
    };
  }
  // mkdir / dir / ls (exploring .git)
  if (lc.includes('mkdir') || lc.includes('dir .git') || lc.includes('ls -la .git')) {
    return {
      cmd: lc.includes('mkdir') ? 'mkdir' : 'ls .git/',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: lc.includes('mkdir') ? '(no folder)' : '.git/ contents', status: 'normal' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: lc.includes('mkdir') ? [{ name: 'my-project/ created', status: 'new' }] : [{ name: 'HEAD', status: 'normal' }, { name: 'objects/', status: 'normal' }, { name: 'refs/', status: 'normal' }, { name: 'config', status: 'normal' }] }] }
    };
  }
  // echo > file (creating/writing files)
  if (lc.includes('echo') && (lc.includes('>') || lc.includes('>>'))) {
    return {
      cmd: 'echo > file',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'existing files', status: 'normal' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', changed: true, files: [{ name: 'file created/modified', status: 'new' }] }] }
    };
  }
  // cat (viewing file)
  if (lc.includes('cat ')) {
    return {
      cmd: 'cat',
      before: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'file contents hidden', status: 'modified' }] }] },
      after: { areas: [{ label: t('viz.area.working'), icon: 'fa-folder-open', color: '#8B5CF6', files: [{ name: 'file contents revealed', status: 'normal' }] }] }
    };
  }
  // git branch -r / --set-upstream
  if (lc.includes('branch -r') || lc.includes('--set-upstream')) {
    return {
      cmd: 'git branch -r',
      before: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'local branch', status: 'normal' }] },
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'remote branches', status: 'normal' }] }
      ] },
      after: { areas: [
        { label: t('viz.area.local'), icon: 'fa-database', color: '#10b981', files: [{ name: 'main → origin/main', status: 'new' }] },
        { label: t('viz.area.remote'), icon: 'fa-cloud', color: '#0ea5e9', files: [{ name: 'origin/main', status: 'normal' }, { name: 'origin/feature-api', status: 'normal' }] }
      ] }
    };
  }
  return null;
}

function renderBestPractices() {
  var panel = document.getElementById('viz-practices');
  if (!panel) return;
  var practices = [];
  for (var i = 1; i <= 6; i++) {
    practices.push({
      title: t('viz.bp' + i + '.title'),
      good: t('viz.bp' + i + '.good'),
      bad: t('viz.bp' + i + '.bad'),
      why: t('viz.bp' + i + '.why')
    });
  }
  var html = '<h3 class="viz-practices-title"><i class="fa-solid fa-list-check"></i> ' + t('viz.practices.title') + '</h3>';
  html += '<div class="viz-practices-grid">';
  practices.forEach(function(p) {
    html += '<div class="viz-practice-card fade-in visible">' +
      '<h4>' + p.title + '</h4>' +
      '<div class="viz-practice-row viz-practice-good"><span class="viz-practice-badge"><i class="fa-solid fa-check"></i> ' + t('viz.practices.best') + '</span><code>' + escapeHtml(p.good) + '</code></div>' +
      '<div class="viz-practice-row viz-practice-bad"><span class="viz-practice-badge"><i class="fa-solid fa-xmark"></i> ' + t('viz.practices.pitfalls') + '</span><code>' + escapeHtml(p.bad) + '</code></div>' +
      '<p class="viz-practice-why"><i class="fa-solid fa-circle-info"></i> ' + p.why + '</p>' +
    '</div>';
  });
  html += '</div>';
  panel.innerHTML = html;
}

function initVisualizer() {
  gitGraph = new GitGraphVisualizer('git-canvas');
  var container = document.querySelector('.visualizer-container');
  if (!container) return;
  var canvas = container.querySelector('.visualizer-canvas');
  if (!document.getElementById('viz-workflow-status')) {
    var statusPanel = document.createElement('div');
    statusPanel.id = 'viz-workflow-status';
    statusPanel.className = 'viz-workflow-status';
    container.insertBefore(statusPanel, canvas);
    renderWorkflowStatusPanel({});
  }
  if (!document.getElementById('viz-next-steps')) {
    var nextPanel = document.createElement('div');
    nextPanel.id = 'viz-next-steps';
    nextPanel.className = 'viz-next-steps';
    container.appendChild(nextPanel);
  }
  renderBestPractices();
}

// ==================== RENDERING FUNCTIONS ====================
function renderModules(filter) {
  const grid = document.getElementById('module-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const levels = [
    { key: 'beginner', icon: 'fa-solid fa-seedling', color: '#10b981' },
    { key: 'intermediate', icon: 'fa-solid fa-code-branch', color: '#f59e0b' },
    { key: 'advanced', icon: 'fa-solid fa-rocket', color: '#ef4444' }
  ];

  const activeLevels = filter && filter !== 'all' ? levels.filter(l => l.key === filter) : levels;
  let cardIdx = 0;

  activeLevels.forEach(level => {
    const levelModules = modules.filter(m => m.level === level.key);
    if (levelModules.length === 0) return;

    const section = document.createElement('div');
    section.className = 'level-section';

    const header = document.createElement('div');
    header.className = 'level-section-header';
    header.innerHTML =
      '<div class="level-icon" style="background:' + level.color + '"><i class="' + level.icon + '"></i></div>' +
      '<div class="level-info">' +
        '<h3>' + t('learning.filter.' + level.key) + '</h3>' +
        '<span class="level-count">' + levelModules.length + ' ' + t('module.steps') + '</span>' +
      '</div>';
    section.appendChild(header);

    const subGrid = document.createElement('div');
    subGrid.className = 'level-modules-grid';

    levelModules.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'module-card fade-in visible' + (progress.isCompleted(mod.id) ? ' completed' : '');
      card.style.animationDelay = (cardIdx * 0.05) + 's';
      cardIdx++;
      const pct = mod.steps.length > 0 ? Math.round((Math.min(progress.get(mod.id), mod.steps.length) / mod.steps.length) * 100) : 0;
      const levelLabel = t('learning.filter.' + mod.level);
      card.innerHTML =
        '<div class="module-card-header" style="background:' + mod.gradient + '">' +
          '<div class="module-number">' + mod.id + '</div>' +
          '<div class="module-badge">' + levelLabel + '</div>' +
        '</div>' +
        '<div class="module-card-body">' +
          '<h3><i class="' + mod.icon + '"></i> ' + t(mod.titleKey) + '</h3>' +
          '<p>' + t(mod.descKey) + '</p>' +
          '<div class="module-meta">' +
            '<span><i class="fa-solid fa-clock"></i> ' + mod.duration + ' ' + t('module.minutes') + '</span>' +
            '<span><i class="fa-solid fa-list-check"></i> ' + mod.steps.length + ' ' + t('module.steps') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="module-card-footer">' +
          '<div class="progress-bar-small"><div class="progress-fill-small" style="width:' + pct + '%"></div></div>' +
          '<button class="btn btn-module" onclick="openModule(' + mod.id + ')">' +
            (progress.isCompleted(mod.id) ? '<i class="fa-solid fa-check-circle"></i> ' + t('module.completed') :
             pct > 0 ? '<i class="fa-solid fa-play"></i> ' + t('module.continue') :
             '<i class="fa-solid fa-play"></i> ' + t('module.start')) +
          '</button>' +
        '</div>';
      subGrid.appendChild(card);
    });

    section.appendChild(subGrid);
    grid.appendChild(section);
  });
  updateOverallProgress();
}

function updateOverallProgress() {
  const bar = document.getElementById('overall-progress-bar');
  const text = document.getElementById('overall-progress-text');
  const pct = progress.getOverallPercent();
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = pct + '%';
}

function openModule(moduleId) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod) return;
  currentModule = mod;
  var lp = document.getElementById('learning-path');
  if (lp) lp.style.display = 'none';
  const moduleView = document.getElementById('module-view');
  if (!moduleView) return;
  moduleView.style.display = 'block';
  var titleEl = document.getElementById('module-title');
  if (titleEl) titleEl.textContent = t(mod.titleKey);
  renderModuleContent(mod);
  updateModuleProgress(mod);
  moduleView.scrollIntoView({ behavior: 'smooth' });
}

function updateModuleProgress(mod) {
  if (!mod) return;
  var saved = progress.get(mod.id);
  var total = mod.steps.length;
  var pct = total > 0 ? Math.round((Math.min(saved, total) / total) * 100) : 0;
  var bar = document.getElementById('module-progress-bar');
  var text = document.getElementById('module-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = (currentLang === 'ar' ? 'التقدم: ' : 'Progress: ') + pct + '%';
}

function closeModule() {
  var mv = document.getElementById('module-view');
  if (mv) mv.style.display = 'none';
  var lp = document.getElementById('learning-path');
  if (lp) lp.style.display = 'block';
  currentModule = null;
  renderModules();
  if (lp) lp.scrollIntoView({ behavior: 'smooth' });
}

function renderModuleContent(mod) {
  const container = document.getElementById('module-content');
  if (!container) return;
  container.innerHTML = '';
  const savedStep = progress.get(mod.id);

  mod.steps.forEach((step, idx) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'step-card fade-in visible' + (idx < savedStep ? ' step-completed' : '');
    stepEl.style.animationDelay = (idx * 0.08) + 's';

    let html = '<div class="step-header">' +
      '<div class="step-number">' + (idx + 1) + '</div>' +
      '<h3 class="step-title">' + t(step.titleKey) + '</h3>' +
      '</div>' +
      '<div class="step-description">' + t(step.descKey) + '</div>';

    if (step.commands) {
      html += '<div class="os-tabs">' +
        '<button class="os-tab' + (currentOS === 'windows' ? ' active' : '') + '" data-os="windows"><i class="fa-brands fa-windows"></i> Windows</button>' +
        '<button class="os-tab' + (currentOS === 'mac' ? ' active' : '') + '" data-os="mac"><i class="fa-brands fa-apple"></i> macOS</button>' +
        '<button class="os-tab' + (currentOS === 'linux' ? ' active' : '') + '" data-os="linux"><i class="fa-brands fa-linux"></i> Linux</button>' +
        '</div>';

      ['windows', 'mac', 'linux'].forEach(os => {
        const cmdText = step.commands[os] || step.commands.windows || '';
        html += '<div class="step-command os-content' + (os === currentOS ? ' active' : '') + '" data-os="' + os + '">' +
          '<pre><code>' + cmdText.replace(/</g, '&lt;') + '</code></pre>' +
          '<button class="copy-btn" data-copy="' + cmdText.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') + '"><i class="fa-solid fa-copy"></i></button>' +
          '</div>';
      });
    }

    var explainKey = step.titleKey.replace('.title', '.explain');
    var hasExplain = t(explainKey) !== explainKey;

    if (step.commands && step.output) {
      html += '<button class="btn btn-run"><i class="fa-solid fa-play"></i> ' + t('step.run') + '</button>';
      html += '<div class="step-run-result step-output-hidden">';
      html += '<div class="step-output"><div class="step-output-label"><i class="fa-solid fa-terminal"></i> ' + t('step.output') + '</div>' +
        '<pre><code>' + step.output.replace(/</g, '&lt;') + '</code></pre></div>';
      if (hasExplain) {
        html += '<div class="step-explain"><i class="fa-solid fa-circle-info"></i> <strong>' + t('step.whatHappened') + ':</strong> ' + t(explainKey) + '</div>';
      }
      html += renderStepDiagram(step);
      html += '</div>';
    } else if (step.output) {
      html += '<div class="step-output"><div class="step-output-label"><i class="fa-solid fa-terminal"></i> ' + t('step.output') + '</div>' +
        '<pre><code>' + step.output.replace(/</g, '&lt;') + '</code></pre></div>';
      if (hasExplain) {
        html += '<div class="step-explain"><i class="fa-solid fa-circle-info"></i> <strong>' + t('step.whatHappened') + ':</strong> ' + t(explainKey) + '</div>';
      }
      html += renderStepDiagram(step);
    } else {
      if (hasExplain && step.commands) {
        html += '<div class="step-explain"><i class="fa-solid fa-circle-info"></i> <strong>' + t('step.whatHappened') + ':</strong> ' + t(explainKey) + '</div>';
      }
      html += renderStepDiagram(step);
    }

    if (step.vscodeKey && t(step.vscodeKey) !== step.vscodeKey) {
      html += '<div class="step-vscode"><i class="fa-solid fa-code"></i> <strong>' + t('step.vscode') + ':</strong> ' + t(step.vscodeKey) + '</div>';
    }
    if (step.tipKey && t(step.tipKey) !== step.tipKey) {
      html += '<div class="step-tip"><i class="fa-solid fa-lightbulb"></i> <strong>' + t('step.tip') + ':</strong> ' + t(step.tipKey) + '</div>';
    }
    if (step.warningKey && t(step.warningKey) !== step.warningKey) {
      html += '<div class="step-warning"><i class="fa-solid fa-triangle-exclamation"></i> <strong>' + t('step.warning') + ':</strong> ' + t(step.warningKey) + '</div>';
    }

    // Mark complete button
    html += '<div class="step-actions">' +
      '<button class="btn btn-sm btn-step-complete" data-module-id="' + mod.id + '" data-step-index="' + (idx + 1) + '"' +
      (idx < savedStep ? ' disabled' : '') + '>' +
      (idx < savedStep ? '<i class="fa-solid fa-check-circle"></i> ' + t('module.completed') : '<i class="fa-regular fa-circle"></i> ' + t('module.markComplete')) +
      '</button></div>';

    stepEl.innerHTML = html;
    container.appendChild(stepEl);
  });

  // Module navigation
  const navHtml = '<div class="module-nav">' +
    (mod.id > 1 ? '<button class="btn btn-outline" onclick="openModule(' + (mod.id - 1) + ')"><i class="fa-solid fa-arrow-left"></i> ' + t('module.prev') + '</button>' : '<span></span>') +
    (mod.id < modules.length ? '<button class="btn btn-primary" onclick="openModule(' + (mod.id + 1) + ')">' + t('module.next') + ' <i class="fa-solid fa-arrow-right"></i></button>' : '<span></span>') +
    '</div>';
  container.insertAdjacentHTML('beforeend', navHtml);
}

function runStepCommand(btn) {
  var resultEl = btn.nextElementSibling;
  if (!resultEl) return;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + t('step.running');
  setTimeout(function() {
    resultEl.classList.remove('step-output-hidden');
    resultEl.classList.add('step-output-reveal');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('step.executed');
    btn.classList.add('btn-run-done');
  }, 600);
}

function completeStep(moduleId, stepIndex, btn) {
  progress.save(moduleId, stepIndex);
  btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + t('module.completed');
  btn.classList.add('completed');
  btn.disabled = true;
  var stepCard = btn.closest('.step-card');
  if (stepCard) stepCard.classList.add('step-completed');
  // Update all progress indicators
  var bar = document.getElementById('module-progress-bar');
  var text = document.getElementById('module-progress-text');
  var obar = document.getElementById('overall-progress-bar');
  var otext = document.getElementById('overall-progress-text');
  if (currentModule) {
    var saved = progress.get(currentModule.id);
    var total = currentModule.steps.length;
    var pct = total > 0 ? Math.round((Math.min(saved, total) / total) * 100) : 0;
    if (bar) { bar.style.width = pct + '%'; bar.style.transition = 'width 0.5s ease'; }
    if (text) text.textContent = (currentLang === 'ar' ? 'التقدم: ' : 'Progress: ') + pct + '%';
  }
  var overallPct = progress.getOverallPercent();
  if (obar) { obar.style.width = overallPct + '%'; obar.style.transition = 'width 0.5s ease'; }
  if (otext) otext.textContent = overallPct + '%';
}

function switchOS(btn, os) {
  var tabsDiv = btn.parentElement;
  if (!tabsDiv || !tabsDiv.classList.contains('os-tabs')) {
    tabsDiv = btn.closest('.os-tabs');
  }
  if (!tabsDiv) return;
  var card = tabsDiv.closest('.step-card') || tabsDiv.parentElement;
  if (!card) return;
  tabsDiv.querySelectorAll('.os-tab').forEach(function(tab) {
    if (tab.dataset.os === os) tab.classList.add('active');
    else tab.classList.remove('active');
  });
  card.querySelectorAll('.os-content').forEach(function(c) {
    c.classList.remove('os-switch-flash');
    if (c.dataset.os === os) {
      c.classList.add('active');
      void c.offsetWidth;
      c.classList.add('os-switch-flash');
    } else {
      c.classList.remove('active');
    }
  });
}

// ==================== CHEAT SHEET ====================
function renderCheatSheet() {
  const grid = document.getElementById('cheat-grid');
  if (!grid) return;
  grid.innerHTML = '';
  cheatSheetData.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cheat-card fade-in visible';
    let html = '<div class="cheat-category" style="background:' + cat.gradient + '">' +
      '<i class="' + cat.icon + '"></i> ' + t(cat.categoryKey) + '</div>' +
      '<div class="cheat-items">';
    cat.commands.forEach(c => {
      html += '<div class="cheat-item">' +
        '<span class="cheat-command">' + c.cmd + '</span>' +
        '<span class="cheat-desc">' + t(c.descKey) + '</span>' +
        '</div>';
    });
    html += '</div>';
    card.innerHTML = html;
    grid.appendChild(card);
  });
}

function filterCheatSheet(query) {
  if (!query) { renderCheatSheet(); return; }
  const q = query.toLowerCase();
  document.querySelectorAll('.cheat-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}

// ==================== QUIZ SYSTEM ====================
function renderQuiz(level) {
  currentQuizLevel = level;
  quizAnswered = {};
  quizScore = 0;
  const questions = quizzes[level] || [];
  quizTotal = questions.length;
  const container = document.getElementById('quiz-container');
  const result = document.getElementById('quiz-result');
  if (!container) return;
  if (result) result.style.display = 'none';
  container.innerHTML = '';

  document.querySelectorAll('.quiz-level-btn').forEach(b => b.classList.toggle('active', b.dataset.level === level));
  updateQuizScore();

  questions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'quiz-card fade-in visible';
    card.id = 'quiz-q-' + qi;
    let html = '<div class="quiz-question"><span class="quiz-number">' + (qi + 1) + '</span> ' + t(q.questionKey) + '</div>' +
      '<div class="quiz-options">';
    q.optionKeys.forEach((optKey, oi) => {
      html += '<div class="quiz-option" data-qi="' + qi + '" data-oi="' + oi + '" onclick="checkAnswer(' + qi + ',' + oi + ')">' +
        '<span class="quiz-option-letter">' + String.fromCharCode(65 + oi) + '</span> ' + t(optKey) + '</div>';
    });
    html += '</div><div class="quiz-explanation" id="quiz-exp-' + qi + '" style="display:none"><i class="fa-solid fa-lightbulb"></i> ' + t(q.explanationKey) + '</div>';
    card.innerHTML = html;
    container.appendChild(card);
  });
}

function checkAnswer(qi, oi) {
  if (quizAnswered[qi] !== undefined) return;
  quizAnswered[qi] = oi;
  const questions = quizzes[currentQuizLevel];
  const correct = questions[qi].correct;
  const card = document.getElementById('quiz-q-' + qi);
  if (!card) return;

  card.querySelectorAll('.quiz-option').forEach(opt => {
    const optIdx = parseInt(opt.dataset.oi);
    if (optIdx === correct) opt.classList.add('correct');
    else if (optIdx === oi && oi !== correct) opt.classList.add('incorrect');
    opt.style.pointerEvents = 'none';
  });

  if (oi === correct) quizScore++;
  updateQuizScore();

  const exp = document.getElementById('quiz-exp-' + qi);
  if (exp) { exp.style.display = 'block'; exp.classList.add('slide-down'); }

  if (Object.keys(quizAnswered).length === quizTotal) {
    setTimeout(showQuizResults, 800);
  }
}

function updateQuizScore() {
  const el = document.getElementById('quiz-score');
  if (el) el.textContent = quizScore + '/' + quizTotal;
}

function showQuizResults() {
  const result = document.getElementById('quiz-result');
  if (!result || quizTotal === 0) return;
  const pct = Math.round((quizScore / quizTotal) * 100);
  let msg = '', cls = '';
  if (pct >= 80) { msg = currentLang === 'ar' ? 'ممتاز! أداء رائع!' : 'Excellent! Great job!'; cls = 'result-excellent'; }
  else if (pct >= 60) { msg = currentLang === 'ar' ? 'جيد! استمر في التعلم!' : 'Good! Keep learning!'; cls = 'result-good'; }
  else { msg = currentLang === 'ar' ? 'تحتاج مراجعة. حاول مرة أخرى!' : 'Needs review. Try again!'; cls = 'result-review'; }

  result.innerHTML = '<div class="quiz-result-content ' + cls + '">' +
    '<div class="quiz-result-score">' + pct + '%</div>' +
    '<div class="quiz-result-text">' + quizScore + '/' + quizTotal + ' — ' + msg + '</div>' +
    '<button class="btn btn-primary" onclick="renderQuiz(\'' + currentQuizLevel + '\')"><i class="fa-solid fa-rotate"></i> ' + (currentLang === 'ar' ? 'إعادة المحاولة' : 'Try Again') + '</button>' +
    '</div>';
  result.style.display = 'block';
}

// ==================== HERO SUBTITLE TYPEWRITER ====================
var heroSubtitleTimer = null;
function animateHeroSubtitle() {
  var el = document.querySelector('.hero-subtitle');
  if (!el) return;
  if (heroSubtitleTimer) { clearTimeout(heroSubtitleTimer); heroSubtitleTimer = null; }

  var phrases = currentLang === 'ar'
    ? ['تعلّم Git بشكل تفاعلي', 'تدرّب على الأوامر', 'تصوّر سير العمل', 'أتقن إدارة الإصدارات']
    : ['Learn Git interactively', 'Practice commands', 'Visualize workflows', 'Master version control'];

  el.innerHTML = '<span class="typewriter-cursor"></span>';
  el.style.minHeight = '2em';
  var textNode = document.createTextNode('');
  el.insertBefore(textNode, el.firstChild);
  var cursor = el.querySelector('.typewriter-cursor');
  var phraseIdx = 0;

  function typePhrase() {
    var text = phrases[phraseIdx];
    var i = 0;
    cursor.classList.remove('hidden');
    function typeChar() {
      if (i <= text.length) {
        textNode.textContent = text.substring(0, i);
        i++;
        heroSubtitleTimer = setTimeout(typeChar, 35);
      } else {
        heroSubtitleTimer = setTimeout(erasePhrase, 2000);
      }
    }
    typeChar();
  }

  function erasePhrase() {
    var current = textNode.textContent;
    var i = current.length;
    function eraseChar() {
      if (i >= 0) {
        textNode.textContent = current.substring(0, i);
        i--;
        heroSubtitleTimer = setTimeout(eraseChar, 20);
      } else {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        heroSubtitleTimer = setTimeout(typePhrase, 400);
      }
    }
    eraseChar();
  }

  heroSubtitleTimer = setTimeout(typePhrase, 900);
}

// ==================== HERO TERMINAL ANIMATION ====================
function animateHeroTerminal() {
  const body = document.getElementById('hero-terminal-body');
  if (!body) return;
  const commands = [
    { cmd: 'git init', output: 'Initialized empty Git repository in /project/.git/' },
    { cmd: 'touch index.html style.css app.js', output: '' },
    { cmd: 'git add .', output: '' },
    { cmd: 'git commit -m "Initial commit"', output: '[main (root-commit) a1b2c3d] Initial commit\n 3 files changed, 0 insertions(+)' },
    { cmd: 'git switch -c feature/awesome', output: "Switched to a new branch 'feature/awesome'" },
    { cmd: 'git push -u origin main', output: 'Branch "main" set up to track remote branch.' }
  ];

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function typeChar(span, text) {
    for (let i = 0; i <= text.length; i++) {
      span.textContent = text.substring(0, i);
      await sleep(28 + Math.random() * 22);
    }
  }

  async function fadeIn(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    await sleep(300);
  }

  async function run() {
    while (true) {
      body.innerHTML = '';
      for (var i = 0; i < commands.length; i++) {
        var c = commands[i];
        var line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = '<span class="terminal-prompt"></span> <span class="terminal-command typing-cursor"></span>';
        body.appendChild(line);
        await fadeIn(line);
        var cmdSpan = line.querySelector('.terminal-command');
        await typeChar(cmdSpan, c.cmd);
        cmdSpan.classList.remove('typing-cursor');
        await sleep(300);
        if (c.output) {
          var outLine = document.createElement('div');
          outLine.className = 'terminal-line terminal-output';
          outLine.textContent = c.output;
          body.appendChild(outLine);
          await fadeIn(outLine);
        }
        body.scrollTop = body.scrollHeight;
        await sleep(500);
      }
      await sleep(3000);
      body.style.transition = 'opacity 0.5s ease';
      body.style.opacity = '0';
      await sleep(500);
      body.innerHTML = '';
      body.style.opacity = '1';
    }
  }
  setTimeout(run, 800);
}

// ==================== WORKFLOW DIAGRAMS ====================
function renderWorkflow(type) {
  const container = document.getElementById('workflow-content');
  if (!container) return;

  document.querySelectorAll('.workflow-tab').forEach(b => b.classList.toggle('active', b.dataset.workflow === type));

  const workflows = {
    gitflow: {
      title: currentLang === 'ar' ? 'سير عمل GitFlow' : 'GitFlow Workflow',
      desc: currentLang === 'ar'
        ? 'GitFlow هو نموذج تفريع يستخدم فروع رئيسية (main, develop) وفروع دعم (feature, release, hotfix). مناسب للمشاريع ذات الإصدارات المجدولة.'
        : 'GitFlow uses two permanent branches (main, develop) and supporting branches (feature, release, hotfix). Best for projects with scheduled releases.',
      svg: '<svg viewBox="0 0 800 340" class="workflow-svg">' +
        '<defs>' +
          '<marker id="arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#10b981"/></marker>' +
          '<marker id="arrow-purple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#8B5CF6"/></marker>' +
          '<marker id="arrow-cyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#06b6d4"/></marker>' +
          '<marker id="arrow-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f59e0b"/></marker>' +
          '<marker id="arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>' +
          '<filter id="glow"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
        '</defs>' +
        // main branch
        '<rect x="10" y="44" width="55" height="22" rx="11" fill="#10b981" opacity="0.15"/>' +
        '<text x="37" y="59" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">main</text>' +
        '<line x1="75" y1="55" x2="760" y2="55" stroke="#10b981" stroke-width="3" marker-end="url(#arrow-green)"/>' +
        // develop branch
        '<rect x="10" y="124" width="75" height="22" rx="11" fill="#8B5CF6" opacity="0.15"/>' +
        '<text x="47" y="139" fill="#8B5CF6" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">develop</text>' +
        '<line x1="95" y1="135" x2="760" y2="135" stroke="#8B5CF6" stroke-width="3" marker-end="url(#arrow-purple)"/>' +
        // feature branch
        '<line x1="220" y1="135" x2="220" y2="215" stroke="#06b6d4" stroke-width="2.5"/>' +
        '<line x1="220" y1="215" x2="420" y2="215" stroke="#06b6d4" stroke-width="2.5"/>' +
        '<line x1="420" y1="215" x2="420" y2="135" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#arrow-cyan)"/>' +
        '<rect x="265" y="226" width="110" height="20" rx="10" fill="#06b6d4" opacity="0.12"/>' +
        '<text x="320" y="240" fill="#06b6d4" font-size="10" text-anchor="middle" font-weight="600">feature branch</text>' +
        '<circle cx="280" cy="215" r="5" fill="#06b6d4"/><circle cx="350" cy="215" r="5" fill="#06b6d4"/>' +
        // release branch
        '<line x1="480" y1="135" x2="480" y2="95" stroke="#f59e0b" stroke-width="2.5"/>' +
        '<line x1="480" y1="95" x2="590" y2="95" stroke="#f59e0b" stroke-width="2.5"/>' +
        '<line x1="590" y1="95" x2="590" y2="55" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrow-amber)"/>' +
        '<line x1="590" y1="95" x2="590" y2="135" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrow-amber)"/>' +
        '<rect x="495" y="77" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.12"/>' +
        '<text x="527" y="90" fill="#f59e0b" font-size="10" text-anchor="middle" font-weight="600">release</text>' +
        '<circle cx="530" cy="95" r="5" fill="#f59e0b"/>' +
        // hotfix branch
        '<line x1="670" y1="55" x2="670" y2="270" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,3"/>' +
        '<line x1="670" y1="270" x2="700" y2="270" stroke="#ef4444" stroke-width="2.5"/>' +
        '<line x1="670" y1="270" x2="670" y2="135" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,3" opacity="0.5"/>' +
        '<rect x="680" y="261" width="55" height="18" rx="9" fill="#ef4444" opacity="0.12"/>' +
        '<text x="707" y="274" fill="#ef4444" font-size="10" text-anchor="middle" font-weight="600">hotfix</text>' +
        '<circle cx="700" cy="270" r="5" fill="#ef4444"/>' +
        // commit dots - main
        '<circle cx="120" cy="55" r="6" fill="#10b981" filter="url(#glow)"/><circle cx="300" cy="55" r="5" fill="#10b981"/>' +
        '<circle cx="590" cy="55" r="6" fill="#10b981" filter="url(#glow)"/><circle cx="670" cy="55" r="5" fill="#10b981"/><circle cx="750" cy="55" r="5" fill="#10b981"/>' +
        // commit dots - develop
        '<circle cx="140" cy="135" r="5" fill="#8B5CF6"/><circle cx="220" cy="135" r="6" fill="#8B5CF6" filter="url(#glow)"/>' +
        '<circle cx="420" cy="135" r="6" fill="#8B5CF6" filter="url(#glow)"/><circle cx="480" cy="135" r="5" fill="#8B5CF6"/>' +
        '<circle cx="590" cy="135" r="6" fill="#8B5CF6" filter="url(#glow)"/><circle cx="700" cy="135" r="5" fill="#8B5CF6"/>' +
        // legend
        '<g transform="translate(30,295)">' +
          '<circle cx="0" cy="0" r="5" fill="#10b981"/><text x="12" y="4" fill="#aaa" font-size="9">main</text>' +
          '<circle cx="70" cy="0" r="5" fill="#8B5CF6"/><text x="82" y="4" fill="#aaa" font-size="9">develop</text>' +
          '<circle cx="155" cy="0" r="5" fill="#06b6d4"/><text x="167" y="4" fill="#aaa" font-size="9">feature</text>' +
          '<circle cx="235" cy="0" r="5" fill="#f59e0b"/><text x="247" y="4" fill="#aaa" font-size="9">release</text>' +
          '<circle cx="310" cy="0" r="5" fill="#ef4444"/><text x="322" y="4" fill="#aaa" font-size="9">hotfix</text>' +
          '<line x1="380" y1="-2" x2="405" y2="-2" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,2"/><text x="412" y="2" fill="#aaa" font-size="9">merge</text>' +
        '</g>' +
        '</svg>'
    },
    githubflow: {
      title: currentLang === 'ar' ? 'سير عمل GitHub Flow' : 'GitHub Flow',
      desc: currentLang === 'ar'
        ? 'GitHub Flow هو سير عمل مبسط يستخدم فرع main واحد مع فروع ميزات قصيرة العمر. مثالي للنشر المستمر.'
        : 'GitHub Flow is a simplified workflow with a single main branch and short-lived feature branches. Perfect for continuous deployment.',
      svg: '<svg viewBox="0 0 800 250" class="workflow-svg">' +
        '<defs>' +
          '<marker id="arr-g2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#10b981"/></marker>' +
          '<marker id="arr-p2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#8B5CF6"/></marker>' +
          '<marker id="arr-pk2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ec4899"/></marker>' +
          '<filter id="glow2"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
        '</defs>' +
        // main
        '<rect x="10" y="49" width="55" height="22" rx="11" fill="#10b981" opacity="0.15"/>' +
        '<text x="37" y="64" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">main</text>' +
        '<line x1="75" y1="60" x2="760" y2="60" stroke="#10b981" stroke-width="3" marker-end="url(#arr-g2)"/>' +
        // feature-1
        '<line x1="170" y1="60" x2="170" y2="140" stroke="#8B5CF6" stroke-width="2.5"/>' +
        '<line x1="170" y1="140" x2="370" y2="140" stroke="#8B5CF6" stroke-width="2.5"/>' +
        '<line x1="370" y1="140" x2="370" y2="60" stroke="#8B5CF6" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arr-p2)"/>' +
        '<circle cx="230" cy="140" r="5" fill="#8B5CF6"/><circle cx="300" cy="140" r="5" fill="#8B5CF6"/>' +
        '<rect x="210" y="153" width="130" height="18" rx="9" fill="#8B5CF6" opacity="0.1"/>' +
        '<text x="275" y="166" fill="#8B5CF6" font-size="10" text-anchor="middle" font-weight="600">feature-1 (PR Review)</text>' +
        // merge label 1
        '<rect x="340" y="33" width="60" height="16" rx="8" fill="#f59e0b" opacity="0.15"/>' +
        '<text x="370" y="45" fill="#f59e0b" font-size="9" text-anchor="middle" font-weight="600">merge</text>' +
        // feature-2
        '<line x1="430" y1="60" x2="430" y2="140" stroke="#ec4899" stroke-width="2.5"/>' +
        '<line x1="430" y1="140" x2="590" y2="140" stroke="#ec4899" stroke-width="2.5"/>' +
        '<line x1="590" y1="140" x2="590" y2="60" stroke="#ec4899" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arr-pk2)"/>' +
        '<circle cx="480" cy="140" r="5" fill="#ec4899"/><circle cx="540" cy="140" r="5" fill="#ec4899"/>' +
        '<rect x="450" y="153" width="130" height="18" rx="9" fill="#ec4899" opacity="0.1"/>' +
        '<text x="515" y="166" fill="#ec4899" font-size="10" text-anchor="middle" font-weight="600">feature-2 (PR Review)</text>' +
        // merge label 2
        '<rect x="560" y="33" width="60" height="16" rx="8" fill="#f59e0b" opacity="0.15"/>' +
        '<text x="590" y="45" fill="#f59e0b" font-size="9" text-anchor="middle" font-weight="600">merge</text>' +
        // deploy label
        '<rect x="680" y="33" width="60" height="16" rx="8" fill="#ef4444" opacity="0.15"/>' +
        '<text x="710" y="45" fill="#ef4444" font-size="9" text-anchor="middle" font-weight="700">deploy</text>' +
        // commits - main
        '<circle cx="120" cy="60" r="6" fill="#10b981" filter="url(#glow2)"/><circle cx="370" cy="60" r="6" fill="#10b981" filter="url(#glow2)"/>' +
        '<circle cx="590" cy="60" r="6" fill="#10b981" filter="url(#glow2)"/><circle cx="710" cy="60" r="6" fill="#10b981" filter="url(#glow2)"/><circle cx="750" cy="60" r="5" fill="#10b981"/>' +
        // legend
        '<g transform="translate(30,210)">' +
          '<circle cx="0" cy="0" r="5" fill="#10b981"/><text x="12" y="4" fill="#aaa" font-size="9">main</text>' +
          '<circle cx="70" cy="0" r="5" fill="#8B5CF6"/><text x="82" y="4" fill="#aaa" font-size="9">feature-1</text>' +
          '<circle cx="165" cy="0" r="5" fill="#ec4899"/><text x="177" y="4" fill="#aaa" font-size="9">feature-2</text>' +
          '<line x1="260" y1="-2" x2="285" y2="-2" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,2"/><text x="292" y="2" fill="#aaa" font-size="9">merge PR</text>' +
        '</g>' +
        '</svg>'
    },
    trunk: {
      title: currentLang === 'ar' ? 'التطوير القائم على الجذع' : 'Trunk-Based Development',
      desc: currentLang === 'ar'
        ? 'التطوير القائم على الجذع يعتمد على فرع رئيسي واحد (trunk) مع فروع ميزات قصيرة جداً (أقل من يوم). يركز على التكامل المستمر.'
        : 'Trunk-Based Development uses a single main branch (trunk) with very short-lived feature branches (less than a day). Focuses on continuous integration.',
      svg: '<svg viewBox="0 0 800 220" class="workflow-svg">' +
        '<defs>' +
          '<marker id="arr-g3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#10b981"/></marker>' +
          '<filter id="glow3"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
        '</defs>' +
        // trunk
        '<rect x="10" y="64" width="55" height="22" rx="11" fill="#10b981" opacity="0.15"/>' +
        '<text x="37" y="79" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle" font-family="monospace">trunk</text>' +
        '<line x1="75" y1="75" x2="760" y2="75" stroke="#10b981" stroke-width="4" marker-end="url(#arr-g3)"/>' +
        // short branch 1
        '<line x1="170" y1="75" x2="195" y2="135" stroke="#8B5CF6" stroke-width="2.5"/>' +
        '<line x1="195" y1="135" x2="230" y2="75" stroke="#8B5CF6" stroke-width="2" stroke-dasharray="5,3"/>' +
        '<circle cx="195" cy="135" r="4" fill="#8B5CF6"/>' +
        '<text x="195" y="155" fill="#8B5CF6" font-size="9" text-anchor="middle" font-weight="600">short-lived</text>' +
        // short branch 2
        '<line x1="330" y1="75" x2="355" y2="135" stroke="#ec4899" stroke-width="2.5"/>' +
        '<line x1="355" y1="135" x2="390" y2="75" stroke="#ec4899" stroke-width="2" stroke-dasharray="5,3"/>' +
        '<circle cx="355" cy="135" r="4" fill="#ec4899"/>' +
        '<text x="355" y="155" fill="#ec4899" font-size="9" text-anchor="middle" font-weight="600">short-lived</text>' +
        // short branch 3
        '<line x1="490" y1="75" x2="515" y2="135" stroke="#f59e0b" stroke-width="2.5"/>' +
        '<line x1="515" y1="135" x2="550" y2="75" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>' +
        '<circle cx="515" cy="135" r="4" fill="#f59e0b"/>' +
        '<text x="515" y="155" fill="#f59e0b" font-size="9" text-anchor="middle" font-weight="600">short-lived</text>' +
        // CI/CD deploy markers
        '<rect x="630" y="42" width="70" height="18" rx="9" fill="#ef4444" opacity="0.15"/>' +
        '<text x="665" y="55" fill="#ef4444" font-size="10" text-anchor="middle" font-weight="700">CI/CD</text>' +
        '<line x1="665" y1="60" x2="665" y2="70" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,2"/>' +
        // commits
        '<circle cx="120" cy="75" r="6" fill="#10b981" filter="url(#glow3)"/>' +
        '<circle cx="230" cy="75" r="6" fill="#10b981" filter="url(#glow3)"/>' +
        '<circle cx="280" cy="75" r="5" fill="#10b981"/>' +
        '<circle cx="390" cy="75" r="6" fill="#10b981" filter="url(#glow3)"/>' +
        '<circle cx="440" cy="75" r="5" fill="#10b981"/>' +
        '<circle cx="550" cy="75" r="6" fill="#10b981" filter="url(#glow3)"/>' +
        '<circle cx="610" cy="75" r="5" fill="#10b981"/>' +
        '<circle cx="665" cy="75" r="6" fill="#10b981" filter="url(#glow3)"/>' +
        '<circle cx="740" cy="75" r="5" fill="#10b981"/>' +
        // legend
        '<g transform="translate(30,190)">' +
          '<circle cx="0" cy="0" r="5" fill="#10b981"/><text x="12" y="4" fill="#aaa" font-size="9">trunk (main)</text>' +
          '<line x1="110" y1="-2" x2="135" y2="-2" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,2"/><text x="142" y="2" fill="#aaa" font-size="9">merge back</text>' +
          '<rect x="220" y="-8" width="50" height="14" rx="7" fill="#ef4444" opacity="0.15"/><text x="245" y="3" fill="#ef4444" font-size="9" text-anchor="middle">CI/CD</text>' +
        '</g>' +
        '</svg>'
    }
  };

  const wf = workflows[type];
  if (!wf) return;
  container.innerHTML = '<h3>' + wf.title + '</h3>' + wf.svg + '<p class="workflow-desc">' + wf.desc + '</p>';
}

// ==================== THEME & LANGUAGE ====================
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('gitmaster-theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = next === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  if (gitGraph) setTimeout(() => gitGraph.render(), 50);
}

function setLanguage(lang) {
  currentLang = lang;
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('gitmaster-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else el.innerHTML = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val !== key) el.placeholder = val;
  });
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'en' ? 'العربية' : 'English';

  // Re-render dynamic content
  renderModules();
  renderCheatSheet();
  renderQuiz(currentQuizLevel);
  if (currentModule) {
    renderModuleContent(currentModule);
    updateModuleProgress(currentModule);
  }
  renderWorkflow(document.querySelector('.workflow-tab.active')?.dataset.workflow || 'gitflow');
  renderBestPractices();
  renderChallengeBar();
  renderGuidePanel();
  animateHeroSubtitle();
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
}

// ==================== SCROLL & NAVIGATION ====================
function setupScrollEffects() {
  const progressBar = document.getElementById('progress-indicator');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && scrollHeight > 0) progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
    if (scrollTopBtn) { scrollTopBtn.style.display = scrollTop > 500 ? 'flex' : 'none'; }
    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 50);

    // Active nav link
    const sections = ['hero', 'learning-path', 'terminal-playground', 'git-visualizer', 'cheatsheet', 'quiz-section'];
    let activeId = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 150) activeId = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  });

  if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

let globalObserver = null;
function setupIntersectionObserver() {
  if (!globalObserver) {
    globalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          globalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }
  document.querySelectorAll('.fade-in:not(.visible), .slide-up:not(.visible)').forEach(el => globalObserver.observe(el));
}

// ==================== EVENT LISTENERS & INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  // Load preferences
  const savedTheme = localStorage.getItem('gitmaster-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const savedLang = localStorage.getItem('gitmaster-lang') || 'en';
  const savedOS = localStorage.getItem('gitmaster-os') || detectOS();

  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

  currentOS = savedOS;
  const osSelect = document.getElementById('os-select');
  if (osSelect) osSelect.value = savedOS;

  // Render everything
  renderModules();
  renderCheatSheet();
  renderQuiz('beginner');
  setupTerminal();
  setupQuickCommands();
  initTerminalEnhancements();
  initVisualizer();
  animateHeroSubtitle();
  animateHeroTerminal();
  renderWorkflow('gitflow');

  // Apply language last (re-renders content)
  setLanguage(savedLang);

  // Event: Theme toggle
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Event: Language toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // Event: OS selector
  if (osSelect) osSelect.addEventListener('change', (e) => {
    currentOS = e.target.value;
    localStorage.setItem('gitmaster-os', currentOS);
    if (currentModule) renderModuleContent(currentModule);
  });

  // Event: Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { navLinks.classList.remove('active'); hamburger.classList.remove('active'); });
    });
  }

  // Event: Module filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderModules(btn.dataset.filter);
    });
  });

  // Event: Back button
  const backBtn = document.getElementById('module-back');
  if (backBtn) backBtn.addEventListener('click', closeModule);

  // Event: Module content delegation (OS tabs, copy, run, complete)
  var mc = document.getElementById('module-content');
  if (mc) {
    mc.addEventListener('click', function(e) {
      var osTab = e.target.closest('.os-tab');
      if (osTab) {
        switchOS(osTab, osTab.dataset.os);
        return;
      }
      var copyBtn = e.target.closest('.copy-btn');
      if (copyBtn && copyBtn.dataset.copy !== undefined) {
        copyToClipboard(copyBtn.dataset.copy, copyBtn);
        return;
      }
      var runBtn = e.target.closest('.btn-run');
      if (runBtn && !runBtn.disabled) {
        runStepCommand(runBtn);
        return;
      }
      var completeBtn = e.target.closest('.btn-step-complete');
      if (completeBtn && !completeBtn.disabled) {
        var mid = parseInt(completeBtn.dataset.moduleId);
        var sidx = parseInt(completeBtn.dataset.stepIndex);
        if (!isNaN(mid) && !isNaN(sidx)) completeStep(mid, sidx, completeBtn);
        return;
      }
    });
  }

  // Event: Cheat sheet search
  const cheatSearch = document.getElementById('cheat-search');
  if (cheatSearch) cheatSearch.addEventListener('input', (e) => filterCheatSheet(e.target.value));

  // Event: Quiz level buttons
  document.querySelectorAll('.quiz-level-btn').forEach(btn => {
    btn.addEventListener('click', () => renderQuiz(btn.dataset.level));
  });

  // Event: Visualizer buttons
  document.querySelectorAll('.viz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (!gitGraph) return;
      if (action === 'init') {
        gitGraph.init();
        renderWorkflowStatusPanel({ working: true, local: true, highlight: 'local' });
        renderNextSteps([
          { label: t('viz.next.addFile'), action: 'add' },
          { label: t('viz.next.commit'), action: 'commit' },
          { label: t('viz.next.createBranch'), action: 'branch' }
        ]);
      }
      else if (action === 'commit') {
        var branches = Object.keys(gitGraph.branchY);
        showVizCommitInput(branches, function(msg, branch) {
          gitGraph.addCommit(msg, branch);
          renderWorkflowStatusPanel({ working: true, staging: true, local: true, highlight: 'local', arrow: 1 });
          renderNextSteps([
            { label: t('viz.next.createBranch'), action: 'branch' },
            { label: t('viz.next.push'), action: 'push' },
            { label: t('viz.next.moreCommits'), action: 'commit' }
          ]);
        });
      }
      else if (action === 'branch') {
        showVizInput(
          currentLang === 'ar' ? 'اسم الفرع:' : 'Branch name:',
          'feature',
          function(name) {
            gitGraph.createBranch(name);
            renderWorkflowStatusPanel({ working: true, local: true, highlight: 'local' });
            renderNextSteps([
              { label: t('viz.next.commitBranch').replace('{branch}', name), action: 'commit' },
              { label: t('viz.next.switchBranch'), action: 'switch' },
              { label: t('viz.next.mergeLater'), action: 'merge', param: name }
            ]);
          }
        );
      }
      else if (action === 'merge') {
        showVizInput(
          currentLang === 'ar' ? 'دمج من فرع:' : 'Merge from branch:',
          'feature',
          function(from) {
            gitGraph.merge(from, 'main');
            renderWorkflowStatusPanel({ working: true, staging: true, local: true, highlight: 'local' });
            renderNextSteps([
              { label: t('viz.next.push'), action: 'push' },
              { label: t('viz.next.deleteBranch'), action: 'deleteBranch' },
              { label: t('viz.next.newFeature'), action: 'branch', param: 'feature-next' }
            ]);
          }
        );
      }
      else if (action === 'reset' || action === 'clear') {
        gitGraph.reset();
        renderWorkflowStatusPanel({});
        renderNextSteps([]);
      }
    });
  });

  // Event: Workflow tabs
  document.querySelectorAll('.workflow-tab').forEach(btn => {
    btn.addEventListener('click', () => renderWorkflow(btn.dataset.workflow));
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      var href = a.getAttribute('href');
      if (href === '#' || href === '#top') return;
      if (currentModule) {
        currentModule = null;
        renderModules();
      }
      var mv = document.getElementById('module-view');
      if (mv) mv.style.display = 'none';
      var lp = document.getElementById('learning-path');
      if (lp) lp.style.display = 'block';
      var target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Scroll effects
  setupScrollEffects();

  // Hide loader
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500); }, 600);

  // Intersection observer for animations (delayed so elements are rendered)
  setTimeout(setupIntersectionObserver, 100);
});
