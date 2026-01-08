/* ============================================
   VIBELY - Social Network JavaScript
   Interactive functionality for all pages
   ============================================ */

// ============================================
// Global Variables and Utilities
// ============================================

const Utils = {
    // Show/Hide password toggle
    togglePassword: (input, icon) => {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    },

    // Show notification toast
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Format time ago
    timeAgo: (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + 'y';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + 'mo';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + 'd';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + 'h';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + 'm';
        
        return Math.floor(seconds) + 's';
    }
};

// ============================================
// Login & Signup Page
// ============================================

// Password toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const passwordToggles = document.querySelectorAll('.toggle-password');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            Utils.togglePassword(passwordInput, toggle);
        });
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate login
            if (email && password) {
                Utils.showNotification('Login successful!  Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'feed.html';
                }, 1500);
            } else {
                Utils.showNotification('Please fill in all fields', 'error');
            }
        });
    }

    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('signupPassword').value;
            
            if (firstName && lastName && email && username && password) {
                Utils.showNotification('Account created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'feed.html';
                }, 1500);
            } else {
                Utils.showNotification('Please fill in all fields', 'error');
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.classList.contains('btn-google') ? 'Google' : 'Facebook';
            Utils.showNotification(`${provider} login coming soon!`, 'info');
        });
    });
});

// ============================================
// Navigation & User Menu
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // User menu dropdown toggle
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        const userAvatar = userMenu.querySelector('.user-avatar');
        const dropdownMenu = userMenu.querySelector('.dropdown-menu');
        
        userAvatar?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu?.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                dropdownMenu?.classList.remove('show');
            }
        });
    }

    // Search bar functionality
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchQuery = searchBar.value.trim();
                if (searchQuery) {
                    Utils.showNotification(`Searching for: ${searchQuery}`, 'info');
                    // Implement search functionality here
                }
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector('.nav-center')?.classList.toggle('show');
        });
    }
});

// ============================================
// Feed Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Create post functionality
    const createPostInput = document.querySelector('.create-post-input');
    const postButton = document.querySelector('.create-post-actions .btn-primary');
    
    if (createPostInput && postButton) {
        postButton.addEventListener('click', () => {
            const postContent = createPostInput.value.trim();
            if (postContent) {
                Utils.showNotification('Post created successfully!', 'success');
                createPostInput.value = '';
                // Add post to feed (implement as needed)
            } else {
                Utils.showNotification('Please write something to post', 'error');
            }
        });
    }

    // Post action buttons (Like, Dislike, Comment, Save, Share)
    const postActionButtons = document.querySelectorAll('.post-action-btn');
    postActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            const action = this.textContent.trim();
            
            if (action.includes('Like')) {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    icon.style.color = 'var(--primary-purple)';
                    Utils.showNotification('Post liked! ', 'success');
                } else {
                    icon.style.color = '';
                    Utils.showNotification('Like removed', 'info');
                }
            } else if (action.includes('Dislike')) {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    icon.style.color = 'var(--error)';
                    Utils.showNotification('Post disliked', 'info');
                } else {
                    icon.style.color = '';
                }
            } else if (action.includes('Save')) {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    icon.style.color = 'var(--primary-yellow-dark)';
                    Utils.showNotification('Post saved! ', 'success');
                } else {
                    icon.style.color = '';
                    Utils.showNotification('Post unsaved', 'info');
                }
            } else if (action.includes('Comment')) {
                Utils.showNotification('Comment feature coming soon!', 'info');
            } else if (action.includes('Share')) {
                Utils.showNotification('Post shared!', 'success');
            }
        });
    });

    // Post action button (Photo, Video, Feeling)
    const postActionBtns = document.querySelectorAll('.post-action-btn');
    postActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text === 'Photo' || text === 'Video' || text === 'Feeling') {
                Utils.showNotification(`${text} upload coming soon!`, 'info');
            }
        });
    });

    // Sidebar menu active state
    const menuItems = document.querySelectorAll('.menu-item, .sidebar-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Suggested friends - Add button
    const addFriendButtons = document.querySelectorAll('.suggested-user .btn');
    addFriendButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userName = this.parentElement.querySelector('h4').textContent;
            this.textContent = 'Added';
            this.classList.remove('btn-primary');
            this.classList.add('btn-secondary');
            this.disabled = true;
            Utils.showNotification(`Friend request sent to ${userName}! `, 'success');
        });
    });
});

// ============================================
// Profile Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Profile tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });

    // Edit profile button
    const editProfileBtn = document.querySelector('.profile-actions .btn-primary');
    if (editProfileBtn && editProfileBtn.textContent.includes('Edit Profile')) {
        editProfileBtn.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }

    // Share profile button
    const shareProfileBtn = document.querySelector('.profile-actions .btn-secondary');
    if (shareProfileBtn && shareProfileBtn.textContent.includes('Share')) {
        shareProfileBtn.addEventListener('click', () => {
            Utils.showNotification('Profile link copied to clipboard!', 'success');
            // Copy to clipboard functionality
            navigator.clipboard.writeText(window.location.href);
        });
    }

    // Edit cover and avatar buttons
    const editCoverBtn = document.querySelector('.edit-cover-btn');
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    
    editCoverBtn?.addEventListener('click', () => {
        Utils.showNotification('Cover photo upload coming soon!', 'info');
    });
    
    editAvatarBtn?.addEventListener('click', () => {
        Utils.showNotification('Profile photo upload coming soon!', 'info');
    });
});

// ============================================
// Messages Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Conversation selection
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            conversationItems.forEach(ci => ci.classList.remove('active'));
            this.classList.add('active');
            
            // Clear unread badge
            const badge = this.querySelector('.unread-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    });

    // Send message
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.chat-input-area .btn-primary');
    
    const sendMessage = () => {
        const messageText = chatInput?.value.trim();
        if (messageText) {
            const messagesContainer = document.querySelector('.chat-messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'message sent';
            newMessage.innerHTML = `
                <div class="message-content">
                    <p>${messageText}</p>
                    <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            
            // Remove typing indicator if exists
            const typingIndicator = messagesContainer?.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            messagesContainer?.appendChild(newMessage);
            chatInput.value = '';
            
            // Scroll to bottom
            messagesContainer?.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
            
            // Simulate response
            setTimeout(() => {
                const responseMessage = document.createElement('div');
                responseMessage.className = 'message received';
                responseMessage.innerHTML = `
                    <img src="https://via.placeholder.com/40" alt="User">
                    <div class="message-content">
                        <p>Thanks for your message! </p>
                        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                messagesContainer?.appendChild(responseMessage);
                messagesContainer?.scrollTo({
                    top: messagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }, 2000);
        }
    };
    
    sendButton?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Typing indicator animation
    const typingDots = document.querySelectorAll('.typing-dots span');
    if (typingDots.length > 0) {
        let delay = 0;
        typingDots.forEach(dot => {
            dot.style.animationDelay = `${delay}s`;
            delay += 0.2;
        });
    }

    // Chat action buttons (call, video, info)
    const chatActionButtons = document.querySelectorAll('.chat-actions .icon-btn');
    chatActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-phone')) {
                Utils.showNotification('Voice call feature coming soon!', 'info');
            } else if (icon.classList.contains('fa-video')) {
                Utils.showNotification('Video call feature coming soon!', 'info');
            } else if (icon.classList.contains('fa-info-circle')) {
                document.querySelector('.chat-info-sidebar')?.classList.toggle('show');
            }
        });
    });

    // Message attachment buttons
    const attachmentButtons = document.querySelectorAll('.chat-input-area .icon-btn');
    attachmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-image')) {
                Utils.showNotification('Image upload coming soon!', 'info');
            } else if (icon.classList.contains('fa-smile')) {
                Utils.showNotification('Emoji picker coming soon!', 'info');
            } else if (icon.classList.contains('fa-plus')) {
                Utils.showNotification('Attachment options coming soon!', 'info');
            }
        });
    });

    // Search conversations
    const conversationsSearch = document.querySelector('.conversations-search input');
    conversationsSearch?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        conversationItems.forEach(item => {
            const userName = item.querySelector('h4')?.textContent.toLowerCase();
            if (userName?.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ============================================
// Settings Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Settings menu navigation
    const settingsMenuItems = document.querySelectorAll('.settings-menu-item');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    settingsMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Remove active class from all menu items and sections
            settingsMenuItems.forEach(mi => mi.classList.remove('active'));
            settingsSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and corresponding section
            item.classList.add('active');
            document.getElementById(targetSection)?.classList.add('active');
        });
    });

    // Save changes buttons
    const saveButtons = document.querySelectorAll('.settings-card .btn-primary');
    saveButtons.forEach(button => {
        if (button.textContent.includes('Save') || button.textContent.includes('Update')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                Utils.showNotification('Settings saved successfully!', 'success');
            });
        }
    });

    // Delete account button
    const deleteAccountBtn = document.querySelector('.danger-zone .btn-danger');
    deleteAccountBtn?.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            Utils.showNotification('Account deletion initiated...', 'error');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });

    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('h4')?.textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            Utils.showNotification(`${settingName} ${status}`, 'success');
        });
    });

    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const themeName = this.querySelector('span')?.textContent;
            Utils.showNotification(`Theme changed to ${themeName}`, 'success');
        });
    });

    // Unblock user buttons
    const unblockButtons = document.querySelectorAll('.blocked-user-item .btn');
    unblockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userName = this.parentElement.querySelector('h4')?.textContent;
            if (confirm(`Are you sure you want to unblock ${userName}?`)) {
                this.closest('.blocked-user-item').remove();
                Utils.showNotification(`${userName} has been unblocked`, 'success');
            }
        });
    });

    // Select dropdowns
    const settingSelects = document.querySelectorAll('.setting-select');
    settingSelects.forEach(select => {
        select.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('h4')?.textContent;
            const value = this.value;
            Utils.showNotification(`${settingName} set to ${value}`, 'success');
        });
    });
});

// ============================================
// Groups Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Groups tabs
    const groupsTabs = document.querySelectorAll('.groups-tabs .tab-btn');
    const groupsTabContents = document.querySelectorAll('.groups-container .tab-content');
    
    groupsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            groupsTabs.forEach(t => t.classList.remove('active'));
            groupsTabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });

    // Create group button
    const createGroupBtn = document.querySelector('.groups-header .btn-primary');
    createGroupBtn?.addEventListener('click', () => {
        Utils.showNotification('Create group feature coming soon!', 'info');
    });

    // Join/View group buttons
    const groupButtons = document.querySelectorAll('.group-card .btn');
    groupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-card').querySelector('h3')?.textContent;
            
            if (this.textContent.includes('Join')) {
                this.textContent = 'Joined';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                Utils.showNotification(`You joined ${groupName}! `, 'success');
            } else if (this.textContent.includes('View')) {
                Utils.showNotification(`Opening ${groupName}...`, 'info');
            }
        });
    });

    // Group options menu
    const groupOptionsButtons = document.querySelectorAll('.group-actions .icon-btn');
    groupOptionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            Utils.showNotification('Group options coming soon!', 'info');
        });
    });
});

// ============================================
// Scroll to Top Button
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ============================================
// Infinite Scroll (Feed Page)
// ============================================

let isLoading = false;
let page = 1;

const loadMorePosts = () => {
    if (isLoading) return;
    
    isLoading = true;
    Utils.showNotification('Loading more posts...', 'info');
    
    // Simulate loading posts
    setTimeout(() => {
        const feedContent = document.querySelector('.feed-content');
        if (feedContent) {
            // Add new post (you can customize this)
            const newPost = document.createElement('div');
            newPost.className = 'post-card';
            newPost.innerHTML = `
                <div class="post-header">
                    <img src="https://via.placeholder.com/50" alt="User">
                    <div class="post-user-info">
                        <h4>New User</h4>
                        <p>Just now</p>
                    </div>
                    <button class="icon-btn">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="post-content">
                    <p>This is a newly loaded post! </p>
                </div>
                <div class="post-stats">
                    <span><i class="fas fa-thumbs-up"></i> 0 likes</span>
                    <span>0 comments</span>
                </div>
                <div class="post-actions">
                    <button class="post-action-btn">
                        <i class="fas fa-thumbs-up"></i> Like
                    </button>
                    <button class="post-action-btn">
                        <i class="fas fa-thumbs-down"></i> Dislike
                    </button>
                    <button class="post-action-btn">
                        <i class="fas fa-comment"></i> Comment
                    </button>
                    <button class="post-action-btn">
                        <i class="fas fa-bookmark"></i> Save
                    </button>
                    <button class="post-action-btn">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            `;
            feedContent.appendChild(newPost);
        }
        
        isLoading = false;
        page++;
    }, 1000);
};

// Detect scroll near bottom
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        if (document.querySelector('.feed-content')) {
            loadMorePosts();
        }
    }
});

// ============================================
// Image Preview
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const postImages = document.querySelectorAll('.post-image');
    
    postImages.forEach(image => {
        image.addEventListener('click', function() {
            // Create modal for image preview
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="image-modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="Full size image">
                </div>
            `;
            document.body.appendChild(modal);
            
            setTimeout(() => modal.classList.add('show'), 10);
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    });
});

// ============================================
// Notification System
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const notificationBtn = document.querySelector('.nav-right .icon-btn .fa-bell');
    
    if (notificationBtn) {
        notificationBtn.parentElement.addEventListener('click', () => {
            Utils.showNotification('Notifications panel coming soon!', 'info');
        });
    }
});

// ============================================
// Real-time Updates Simulation
// ============================================

// Simulate real-time notification updates
setInterval(() => {
    const notificationBadge = document.querySelector('.fa-bell').closest('.icon-btn').querySelector('.badge');
    if (notificationBadge && Math.random() > 0.7) {
        const currentCount = parseInt(notificationBadge.textContent) || 0;
        notificationBadge.textContent = currentCount + 1;
    }
}, 30000); // Every 30 seconds

// ============================================
// Error Handling
// ============================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ============================================
// Performance Optimization
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Console Welcome Message
// ============================================

console.log('%cWelcome to Vibely!  🎉', 'color: #8B5CF6; font-size: 24px; font-weight: bold;');
console.log('%cConnect, Share, and Vibe with your community', 'color: #FCD34D; font-size: 14px;');
console.log('%cBuilt with ❤️', 'color: #6B7280; font-size: 12px;');