import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    return (
        
        <div>Admin React Page</div>

        );
    }
    
    export default Index;
    
    if (document.getElementById('admin_app')) {
        ReactDOM.render(<Index />, document.getElementById('admin_app'));
    }
    