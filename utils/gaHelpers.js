/**
 * Created by alex on 23.09.16.
 */
import ReactGA from 'react-ga';
import config from '../server/config';

const REVIEW_REQUEST = 'ReviewRequest';
const SOCIAL_NETWORK = 'SocialNetwork';
const USER = 'USER';

if (typeof window !== 'undefined') ReactGA.initialize(config.GOOGLE_ANALYTICS_ID);

export const gaLogPageView = (pathname) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
};

export const gaLogReviewRequestSent = (onlyCustomEmails) => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Sent',
    label: onlyCustomEmails ? 'onlyCustomEmails' : 'withLoadedEmails'
  });
};

export const gaLogReviewRequestOpened = (isSignIn) => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Opened',
    label: isSignIn ? 'SigIn' : 'NotSignIn'
  });
};
export const gaLogUserRegistered = (havePassedRequest) => {
  ReactGA.event({
    category: USER,
    action: 'Registered',
    label: havePassedRequest ? 'havePassedRequest' : 'notHavePassedRequest'
  });
};

export const gaLogReviewRequestPassed = () => {
  ReactGA.event({
    category: REVIEW_REQUEST,
    action: 'Passed'
  });
};

export const gaLogSocialNetworkShare = () => {
  ReactGA.event({
    category: SOCIAL_NETWORK,
    action: 'Share'
  });
};

export const gaLogUserScoreUnlocked = () => {
  ReactGA.event({
    category: USER,
    action: 'ScoreUnlocked'
  });
};
