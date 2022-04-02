// import React from 'react';
// // import autobind from 'autobind';
// // import { observer, inject } from 'mobx-react';
//
// import { HomePage, HomePageProps } from './Home';
//
// interface Props extends HomePageProps {
// }
//
// // interface StoreProps {
// // }
//
// // const injectableStores: (keyof StoreProps)[] = [
// // ];
//
// // @observer
// export class HomeContainer extends React.Component<Props> {
//
//     public componentDidMount() {
//         var boxshadow = "";
//
//         for(var i = 0; i <= 1500; i++){
//             px = Math.random() < 0.5 ? "-" : "";
//             py = Math.random() < 0.5 ? "-" : "";
//             x = Math.floor((Math.random() * window.innerWidth) + 1);
//             y = Math.floor((Math.random() * window.innerHeight) + 1);
//             s = Math.floor((Math.random() * 2) - 1);
//             boxshadow += px+x+"px "+py+y+"px 0 "+s+"px rgba(177, 198, 219, 1),";
//         }
//
//         boxshadow = boxshadow.slice(0, -1);
//
//         document.getElementById('stars')!.style.boxShadow = boxshadow;
//
//         setTime();
//         rotateClock();
//
//         setInterval(function() {
//             rotateClock();
//             setTime();
//         }, 1000);
//     }
//
//     public render() {
//         return React.createElement(HomePage, {
//             ...this.props,
//         });
//     }
// }
//
// // export const HomeContainer = inject<Props, StoreProps>(...injectableStores)(Component);
