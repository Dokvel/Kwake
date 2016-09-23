/**
 * Created by alex on 23.09.16.
 */
import ReactGA from 'react-ga';
import config from '../server/config';

const REVIEW_REQUEST = 'ReviewRequest';

if (typeof window !== 'undefined') ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);

export const gaLogPageView = (pathname) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
};

export const gaLogReviewRequestSent = () => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Sent'
  });
};

export const gaLogReviewRequestOpened = (isSignIn) => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Opened',
    label: isSignIn ? 'SigIn' : 'NotSignIn'
  });
};

export const gaLogReviewRequestPassed = (isSignIn) => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Passed',
    label: isSignIn ? 'SigIn' : 'NotSignIn'
  });
};
