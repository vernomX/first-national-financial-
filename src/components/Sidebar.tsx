import { useEffect, useState, CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userData } from '../lib/userData';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  path: string;
  disabled?: boolean;
}

// Extend CSSProperties to include pseudo-selectors
type ExtendedCSSProperties = CSSProperties & {
  '&:hover'?: CSSProperties;
};

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const activeTab = pathname?.split('/')[1] || 'dashboard';

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Handle navigation for disabled items
  const handleNavigation = (e: React.MouseEvent, item: NavItem) => {
    if (item.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setIsMobileNavOpen(false);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'transfers', icon: 'swap_horiz', label: 'Transfers', path: '/transfers' },
    { id: 'billpay', icon: 'receipt_long', label: 'Bill Pay', path: '/billpay' },
    { id: 'settings', icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
        );
      case 'account_balance_wallet':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z"></path>
          </svg>
        );
      case 'swap_horiz':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        );
      case 'receipt_long':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
            <line x1="12" y1="12" x2="12" y2="18"></line>
          </svg>
        );
      case 'trending_up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0-1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  // Style objects with proper TypeScript types
  const styles: { [key: string]: any } = {
    // Consistent text styles matching Dashboard
    text: {
      navItem: {
        color: '#64748b',
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: '1.5',
      },
      navItemActive: {
        color: '#4a6cf7',
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: '1.5',
      },
      navItemDisabled: {
        color: '#94a3b8',
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: '1.5',
        opacity: 0.7,
        cursor: 'not-allowed',
      },
      userName: {
        color: '#1a1a2e',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '1.5',
      },
      userTitle: {
        color: '#64748b',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '1.5',
        transition: 'color 0.2s ease',
        '&:hover': {
          color: '#1e40af',
        },
      },
      signOut: {
        color: '#ef4444',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.5',
      },
    },
    sidebar: {
      width: '240px',
      backgroundColor: 'white',
      color: '#1a1a2e',
      padding: '24px 0 0', // Removed bottom padding to allow user section to stick to bottom
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const
    },
    navItem: (isActive: boolean, isDisabled: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      borderRadius: '8px',
      ...(isActive ? styles.text.navItemActive : isDisabled ? styles.text.navItemDisabled : styles.text.navItem),
      backgroundColor: isActive || hoveredItem === 'item.id' ? '#f5f8ff' : 'transparent',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      pointerEvents: isDisabled ? 'none' as const : 'auto' as const,
      ':hover': {
        color: isDisabled ? '#94a3b8' : '#4a6cf7',
        backgroundColor: isDisabled ? 'transparent' : '#f5f8ff',
      }
    }),
    userSection: {
      marginTop: 'auto',
      padding: '16px 24px 20px',
      borderTop: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      position: 'sticky' as const,
      bottom: 0,
      width: '100%',
      boxSizing: 'border-box' as const,
      zIndex: 10,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.02)'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#f8fafc',
        transform: 'translateY(-1px)'
      }
    },
    signOutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '10px 16px',
      backgroundColor: 'transparent',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      color: '#ef4444',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: '#fef2f2',
        borderColor: '#fecaca'
      }
    }
  };

  return (
    <>
      <div className="mobile-topbar">
        <button
          type="button"
          className="mobile-topbar__burger"
          aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((v) => !v)}
        >
          <span className="mobile-topbar__burger-line" />
          <span className="mobile-topbar__burger-line" />
          <span className="mobile-topbar__burger-line" />
        </button>

        <div className="mobile-topbar__brand" aria-label="First National Financial">
          <img src="/assets/logo.svg" alt="Bank Logo" width={28} height={28} />
          <span className="mobile-topbar__brand-text">First National Financial</span>
        </div>

        <div className="mobile-topbar__right" />
      </div>

      <div
        className="app-sidebar-backdrop"
        data-open={isMobileNavOpen}
        onClick={() => setIsMobileNavOpen(false)}
        aria-hidden={!isMobileNavOpen}
      />

      <div
        className="app-sidebar-drawer"
        data-open={isMobileNavOpen}
        style={styles.sidebar as CSSProperties}
      >
        <div style={{ padding: '0 24px', flex: '1 0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <img
                src="/assets/logo.svg"
                alt="Bank Logo"
                width={32}
                height={32}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: '16px',
                color: '#1a1a2e',
                lineHeight: '1.2'
              }}>First National Financial</div>
            </div>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const isDisabled = item.disabled || false;

                return (
                  <li key={item.id} style={{ marginBottom: '4px' }}>
                    <Link
                      to={isDisabled ? '#' : item.path}
                      onClick={(e) => handleNavigation(e, item)}
                      style={{
                        textDecoration: 'none',
                        pointerEvents: isDisabled ? 'none' : 'auto'
                      }}
                    >
                      <div
                        style={{
                          ...(styles.navItem(isActive, isDisabled) as CSSProperties),
                          ...(isActive && { transform: 'none' } as const)
                        } as CSSProperties}
                        onMouseEnter={() => !isDisabled && setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span style={{
                          marginRight: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          opacity: isDisabled ? 0.6 : 1
                        }}>
                          {renderIcon(item.icon)}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: isDisabled ? '#94a3b8' : 'inherit'
                        }}>
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div style={styles.userSection as CSSProperties}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px' // Reduced from 16px to bring elements closer
          }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f0f4f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0,
                color: '#4a5568'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{
                  ...styles.text.userName,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {userData.name}
                </div>
                <div style={{
                  ...styles.text.userTitle,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  View Profile
                </div>
              </div>
            </div>

            <a
              href="/index.html"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '10px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                ...styles.text.signOut,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.borderColor = '#fecaca';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
