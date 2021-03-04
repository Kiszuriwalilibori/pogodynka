import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const MyTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#FFCF10',
      boxShadow: ' 0 0 5px black',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 11, 
    },
  }))(Tooltip);

export default React.memo(MyTooltip);
