import { motion } from 'framer-motion';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import { logoIcon } from 'global_shared/data/base64Icons';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useContext, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const AccordionAnimation = {
  closed: { opacity: 0, height: 0, x: -500 },
  open: { opacity: 1, height: 'auto' },
};

function FloatingTransaction() {
  const [rightSideNav, setRightSideNav] = useState(false);
  const [collapseUp, setCollapseUp] = useState(false);
  const { IsMenuExist, IsMenuCheckNew } = useAuthUserAndMenu();
  const { authUser, clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  const location = useLocation();

  const rightNavHandler = () => {
    if (rightSideNav) {
      setRightSideNav(false);
    } else {
      setRightSideNav(true);
    }
  };

  const urlArrays = location.pathname.split('/');

  const navigate = useNavigate();
  const onIdle = () => {
    clearAuthUserData();
    navigate('/');
  };
  const { start, reset, activate } = useIdleTimer({
    onIdle,
    timeout: 300 * 1000,
    promptBeforeIdle: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
      'focus',
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: true,
    crossTab: false,
    name: 'idle-timer',
    syncTimers: 0,
    leaderElection: false,
  });

  if (authUser != null) {
    return (
      <>
        <motion.div className="absolute z-50 flex h-screen flex-col justify-center">
          <div
            className={`fixed flex transform cursor-pointer flex-row items-center duration-300 ${
              rightSideNav ? 'w-80' : 'w-12'
            }`}
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-evenly rounded-r-md bg-surface text-primary shadow-md`}
            >
              <div
                className={`flex h-16 w-full items-center  justify-between rounded-tr-md bg-error px-2 text-xl font-bold text-onError`}
                onClick={rightNavHandler}
              >
                {rightSideNav && (
                  <div className="flex items-center justify-end gap-2">
                    {authUser.UserPicture === '' ? (
                      <img
                        className="h-10 w-10 rounded-full border border-gray-800 shadow"
                        src={logoIcon}
                        alt="user"
                      ></img>
                    ) : (
                      <img
                        className="h-10 w-10 rounded-full border border-gray-800 shadow"
                        src={`data:image/png;base64, ${
                          authUser ? authUser?.UserPicture : ''
                        }`}
                        alt="user"
                      ></img>
                    )}

                    <p className="">
                      {authUser
                        ? authUser.UserName.replace(/\w+/g, function (w) {
                            return (
                              w[0].toUpperCase() + w.slice(1).toLowerCase()
                            );
                          })
                        : ''}
                    </p>
                  </div>
                )}
                <div className={` ${rightSideNav ? '' : 'pl-1'}`}>
                  <i className="fa-solid fa-bars"></i>
                </div>
              </div>

              <motion.ul
                className={`flex w-full transform flex-col divide-y text-left`}
                initial="open"
                animate={collapseUp ? 'closed' : 'open'}
                exit="open"
                variants={AccordionAnimation}
                transition={{ duration: 0.5 }}
              >
                {IsMenuExist('Info') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('info/my_info');
                    }}
                  >
                    <NavLink
                      to="info"
                      id="info"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-circle-info ml-1 py-2.5 text-xl group-hover:text-error ${
                          location.pathname.includes('info')
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Info
                        </p>
                      </div>
                      {IsMenuCheckNew('Info') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Accounts') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('accounts/my_accounts');
                    }}
                  >
                    <NavLink
                      to="accounts"
                      id="accounts"
                      className={`flex items-center  group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-piggy-bank ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'accounts'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? 'group-hover:bg-primary group-hover:text-onPrimary'
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Accounts
                        </p>
                      </div>
                      {IsMenuCheckNew('Accounts') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Loans') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('/loans/my_loans');
                    }}
                  >
                    <NavLink
                      id="loans"
                      to="/loans"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-hand-holding-dollar ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'loans'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav ? 'block w-[300px]' : 'block w-[300px]'
                        }  ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Loans
                        </p>
                      </div>
                      {IsMenuCheckNew('Loans') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Surety') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('surety/surety_given');
                    }}
                  >
                    <NavLink
                      id="surety"
                      to="surety"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-user-shield ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'surety'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Surety
                        </p>
                      </div>
                      {IsMenuCheckNew('Surety') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Deposit') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('deposits/deposit_now');
                    }}
                  >
                    <NavLink
                      id="deposits"
                      to="deposits"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-circle-dollar-to-slot ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'deposits'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Deposits
                        </p>
                      </div>
                      {IsMenuCheckNew('Deposit') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Transfer') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('transfer/transfer_within_dhaka_credit');
                    }}
                  >
                    <NavLink
                      to="transfer"
                      id="transfer"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-money-bill-transfer ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'transfer'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Transfer
                        </p>
                      </div>
                      {IsMenuCheckNew('Transfer') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Withdraw') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('Withdraw/through_atm');
                    }}
                  >
                    <NavLink
                      to="Withdraw"
                      id="Withdraw"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-sack-dollar ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'Withdraw'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Withdraw
                        </p>
                      </div>
                      {IsMenuCheckNew('Withdraw') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('payment') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('payment/dc_payment');
                    }}
                  >
                    <NavLink
                      to="payment"
                      id="payment"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-credit-card ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'payment'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Payment
                        </p>
                      </div>
                      {IsMenuCheckNew('payment') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Job Portal Administration') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('recruitment/JobCirculars');
                    }}
                  >
                    <NavLink
                      id="recruitment"
                      to="recruitment"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-handshake ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'recruitment'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary text-right'
                          } w-52 px-2 font-semibold transition-all duration-300`}
                        >
                          Job Portal Administration
                        </p>
                      </div>
                      {IsMenuCheckNew('Job Portal Administration') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Personnel') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('Personnel/leave_application');
                    }}
                  >
                    <NavLink
                      id="personnel"
                      to="personnel"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-helmet-safety ml-1 py-2.5 text-xl group-hover:text-error    ${
                          urlArrays[1] === 'Personnel'
                            ? 'fa-beat-fade text-error'
                            : ''
                        }`}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Personnel
                        </p>
                      </div>
                      {IsMenuCheckNew('personnel') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}

                {IsMenuExist('Privacy') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('privacy/change_Password');
                    }}
                  >
                    <NavLink
                      id="privacy"
                      to="privacy"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-lock ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'privacy'
                            ? 'fa-beat-fade text-error'
                            : ''
                        } `}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          Privacy
                        </p>
                      </div>
                      {IsMenuCheckNew('Privacy') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}
                {IsMenuExist('Counter') && (
                  <li
                    className={`group rounded-sm px-2 hover:bg-primary hover:shadow-sm`}
                    onClick={() => {
                      setRightSideNav(false);
                      navigate('Counter/agm_counter');
                    }}
                  >
                    <NavLink
                      id="counter"
                      to="counter"
                      className={`flex items-center group-hover:bg-primary`}
                    >
                      <i
                        className={`fa-solid fa-people-arrows ml-1 py-2.5 text-xl group-hover:text-error  ${
                          urlArrays[1] === 'Counter'
                            ? 'fa-beat-fade text-error'
                            : ''
                        } `}
                      ></i>

                      <div
                        className={`rounded-r-md bg-transparent transition-all group-hover:text-onPrimary ${
                          rightSideNav
                            ? ''
                            : 'hidden py-2.5 text-onSurface group-hover:block group-hover:bg-primary group-hover:text-onPrimary'
                        }`}
                      >
                        <p
                          className={`${
                            rightSideNav
                              ? ''
                              : 'rounded-tr rounded-br border-r border-t border-b border-primary'
                          } h-full px-2 font-semibold transition-all duration-300`}
                        >
                          AGM Counter
                        </p>
                      </div>
                      {IsMenuCheckNew('Counter') ? (
                        <div className="animate-bounce hover:ml-3">
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.000000pt"
                            height="20.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#FF0000"
                              stroke="none"
                            >
                              <path
                                d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                                    -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                                    -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                                    -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                                    -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                                    -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                                    -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                                    104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                                    413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                                    34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                                    -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                                    279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                                    115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                                    -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                                    -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                                    -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                                    -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                                    -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                                    -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                                    -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                                    -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                                    -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                                    4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                                    -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                                    -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                                    -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                                    -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                                    -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                                    147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                                    -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                                    39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                                    -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                                    114 144 222 180 54 18 163 10 212 -16z"
                              />
                              <path
                                d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        ''
                      )}
                    </NavLink>
                  </li>
                )}
              </motion.ul>

              {!rightSideNav && (
                <div
                  className={`flex h-12 w-full items-center  justify-between rounded-br-md bg-error px-2 text-xl font-bold text-onError`}
                  onClick={() => {
                    setCollapseUp(!collapseUp);
                  }}
                >
                  <div className={`flex w-full justify-center`}>
                    <i
                      className={`fa-solid  ${
                        collapseUp ? 'fa-arrow-down' : 'fa-arrow-up'
                      }`}
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </>
    );
  } else {
    return null;
  }
}
export default FloatingTransaction;
