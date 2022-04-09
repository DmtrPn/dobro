// import React from 'react';
// import autobind from 'autobind';
//
// import { Input, InputProps } from './Input';
//
// interface InputContainerProps extends InputProps {
//     onChange?: any;
// }
//
// export class InputContainer extends React.Component<InputContainerProps> {
//
//     public render(): JSX.Element {
//         const {onChange, ...params} = this.props;
//         return (<Input
//             {...params}
//             value={this.state.value}
//             onChange={this.onChange}
//         />);
//     }
//
//     @autobind
//     protected onChange(event: InputEvent) {
//         const value = event.target.value;
//         this.setState({
//             value,
//         });
//
//         if (this.props.onChange) {
//             this.props.onChange(value);
//         }
//     }
// }
