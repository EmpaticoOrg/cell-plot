import {configure, addDecorator} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';

addDecorator(withKnobs);

function loadStories() {
  require('../stories/index');
}

configure(loadStories, module);
