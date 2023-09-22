import React from 'react';
import { DveXAlert } from '../components/main/components';

interface ApplicationProps {
  name: string;
  render: React.ReactNode;
}

interface ApplicationState {
  hasError: boolean;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('---- NP UI ERROR -----');
    console.log('error in app', this.props.name);
    console.log(error.message);
    console.log(errorInfo.componentStack);
    console.log('---- ----- ----- -----');
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <DveXAlert
            AlertText={`Error occurred in app: ${this.props.name} - restarting...`}
            AlertType="error"
          />
        </div>
      );
    }

    return <>{this.props.render}</>;
  }
}

export default Application;