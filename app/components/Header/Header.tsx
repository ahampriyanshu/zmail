'use client';
import { memo, useContext, useEffect, useState } from 'react';
import styles from './header.module.scss';
import {
  GridMenu,
  HamburgerMenu,
  IconBtn,
  QuestionMark,
} from '@/app/components/Icons/Icons';
import { AppContext } from '@/app/AppContext';
import Image from 'next/image';
import Tooltip from '../Tooltip/Tooltip';
import { site } from '@/app/config';
import { usePathname, useRouter } from 'next/navigation';
import { openInNewTab } from '@/app/utils/common';
import { HEADER, PROFILE_DATA } from '@/app/data/links.data';
import { Search } from '../Search/Search';
import Popover from '../Popover/Popover';
import Shepherd from 'shepherd.js';
import { offset } from '@floating-ui/dom';
import 'shepherd.js/dist/css/shepherd.css';
import { PRODUCT_TOUR } from '@/app/constants/common.constants';

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useContext(AppContext);
  const [isHelperOpen, setIsHelperOpen] = useState(false);
  const isMobileSearchActive = state?.isMobileSearchActive || false;
  const isDetailRoute = pathname !== '/';

  useEffect(() => {
    document.body.classList.toggle('mobile-detail-route', isDetailRoute);

    return () => {
      document.body.classList.remove('mobile-detail-route');
    };
  }, [isDetailRoute]);

  const toggleSidebar = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      dispatch({ type: 'TOGGLE_MOBILE_DRAWER' });
      return;
    }
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const startProductTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        modalOverlayOpeningRadius: 12,
        classes: 'tour_tooltip',
      },
      exitOnEsc: false,
      keyboardNavigation: true,
      useModalOverlay: true,
    });
    tour.addSteps([
      {
        id: `${PRODUCT_TOUR.FIRST_STEP}`,
        title: 'Welcome to Zmail',
        text: 'Gmail styled portfolio app in NextJS. Click next to continue.',
        attachTo: { element: `#${PRODUCT_TOUR.FIRST_STEP}`, on: 'right' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Skip',
            classes: 'tour_button secondary_button',
            action: tour.cancel,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.SECOND_STEP}`,
        title: 'Explore with Lists',
        text: "Effortlessly organize your tasks, projects, and more with our intuitive List component. Click 'Next' to discover how Zmail simplifies your workflow.",
        attachTo: { element: `#${PRODUCT_TOUR.SECOND_STEP}`, on: 'bottom' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.THIRD_STEP}`,
        title: 'Navigate with Ease',
        text: "Discover the Sidebar feature, your gateway to smooth navigation. Access key sections of Zmail with just a click. Ready to dive in? Click 'Next'.",
        attachTo: { element: `#${PRODUCT_TOUR.THIRD_STEP}`, on: 'right' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.FOURTH_STEP}`,
        title: 'Find with Precision',
        text: "Locate emails, projects, and more in seconds with Zmail's powerful Searchbar. Click 'Next' to experience the convenience of quick and accurate searches.",
        attachTo: { element: `#${PRODUCT_TOUR.FOURTH_STEP}`, on: 'bottom' },
        canClickTarget: false,
        modalOverlayOpeningRadius: 8,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.FIFTH_STEP}`,
        title: 'Start Fresh',
        text: "Need a clean slate? Learn how to reset data effortlessly with Zmail. Click 'Next' to see how easy it is to refresh and reorganize your workspace.",
        attachTo: { element: `#${PRODUCT_TOUR.FIFTH_STEP}`, on: 'right' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.SIXTH_STEP}`,
        title: 'Stay Connected',
        text: "Enable seamless connections with Zmail's collaboration features. Let's explore how Zmail fosters communication and collaboration. Click 'Next' to continue.",
        attachTo: { element: `#${PRODUCT_TOUR.SIXTH_STEP}`, on: 'bottom' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Next',
            classes: 'tour_button',
            action: tour.next,
          },
        ],
      },
      {
        id: `${PRODUCT_TOUR.SEVENTH_STEP}`,
        title: 'Thank You!',
        text: "Congratulations! You've completed the Zmail Product Tour. We value your feedback. Please take a moment to share your thoughts in the feedback form. Thank you for choosing Zmail!",
        attachTo: { element: `#${PRODUCT_TOUR.SEVENTH_STEP}`, on: 'left' },
        canClickTarget: false,
        floatingUIOptions: {
          middleware: [offset({ mainAxis: 24, crossAxis: 0 })],
        },
        buttons: [
          {
            text: 'Back',
            classes: 'tour_button secondary_button',
            action: tour.back,
          },
          {
            text: 'Done',
            classes: 'tour_button',
            action: tour.complete,
          },
        ],
      },
    ]);
    tour.start();
  };

  return (
    <div
      className={`${styles.container} ${
        isMobileSearchActive ? styles.search_active : ''
      } ${isDetailRoute ? styles.detail_route : ''}`}
    >
      <div className={styles.mobile_menu_container}>
        <Tooltip content='Main Menu'>
          <IconBtn aria-label='Main menu' onClick={toggleSidebar}>
            <HamburgerMenu />
          </IconBtn>
        </Tooltip>
      </div>
      <div className={styles.sidebar_toggle_container}>
        <Tooltip content='Main Menu'>
          <IconBtn aria-label='Main menu' onClick={toggleSidebar}>
            <HamburgerMenu />
          </IconBtn>
        </Tooltip>

        <button
          type='button'
          onClick={() => router.push('/')}
          className='flex-row-center hover'
        >
          <Image src='/zmail.png' alt='logo' width={32} height={32} />
          <h1>{site.title}</h1>
        </button>
      </div>

      <div className={styles.header_profile_container}>
        <Search />

        <div className={styles.logo_container}>
          <Popover
            trigger={
              <Tooltip id={PRODUCT_TOUR.SEVENTH_STEP} content='Support'>
                <IconBtn
                  aria-label='Support'
                  onClick={() => {
                    setIsHelperOpen(!isHelperOpen);
                  }}
                  padding='6px'
                >
                  <QuestionMark />
                </IconBtn>
              </Tooltip>
            }
            content={
              <div className={styles.support_container}>
                <div className={styles.support_body}>
                  <button type='button' onClick={startProductTour}>
                    Help
                  </button>
                  <button
                    type='button'
                    onClick={() => openInNewTab(HEADER.UPDATE_HISTORY)}
                  >
                    Updates
                  </button>
                  <span className={styles.divider} />
                  <button
                    type='button'
                    onClick={() => openInNewTab(HEADER.FEEDBACK_FORM)}
                  >
                    Send feedback to me
                  </button>
                </div>
              </div>
            }
          />

          <Popover
            trigger={
              <Tooltip id={PRODUCT_TOUR.SIXTH_STEP} content='Apps'>
                <IconBtn aria-label='Apps' padding='6px'>
                  <GridMenu />
                </IconBtn>
              </Tooltip>
            }
            content={
              <div className={styles.apps_container}>
                <div className={styles.apps_body}>
                  {Object.entries(PROFILE_DATA).map(([key, value]) => (
                    <button
                      type='button'
                      key={key}
                      onClick={() => openInNewTab(value.link)}
                      className={styles.apps_icon}
                    >
                      <Image
                        src={value.img}
                        alt={value.title}
                        width={36}
                        height={36}
                        className={styles.apps_icon_image}
                        priority
                      />
                      <span className={styles.apps_icon_text}>
                        {value.title}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type='button'
                  className={styles.marketplace_btn}
                  onClick={() => openInNewTab(HEADER.WORKSPACE)}
                >
                  More from marketplace
                </button>
              </div>
            }
          />

          <Popover
            trigger={
              <Tooltip content='Account'>
                <IconBtn aria-label='Account' padding='6px'>
                  <Image
                    style={{
                      borderRadius: '50%',
                    }}
                    src='/avatar.png'
                    alt='logo'
                    width={30}
                    height={30}
                    className={styles.account_trigger_avatar}
                  />
                </IconBtn>
              </Tooltip>
            }
            content={
              <div className={styles.account_container}>
                <Image
                  src='/avatar.png'
                  alt='Priyanshu Tiwari'
                  width={72}
                  height={72}
                  className={styles.account_avatar}
                />
                <div className={styles.account_name}>Priyanshu Tiwari</div>
                <div className={styles.account_email}>
                  avampriyanshu@gmail.com
                </div>
                <button
                  type='button'
                  className={styles.account_action}
                  onClick={() => openInNewTab(HEADER.ACCOUNT)}
                >
                  Manage your Google Account
                </button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
