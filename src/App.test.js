import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App, { Search, Button, Table } from './App';

describe('App', () => {

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  })
});

test('snapshots', () => {
  const component = renderer.create(
    <App />,
    {createNodeMock}
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const createNodeMock = (element) => {
  if (element.type === 'input') {
    return {
      focus() {},
    };
  }
  return null;
}
describe('Search', () => {
  const props = {
    onChange: () => {},
    onSubmit: () => {},
  }
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search { ...props }>Search</Search>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Search { ...props }>Search</Search>, {createNodeMock});
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button', () => {
  const props = {
    onClick: () => {},
  }

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>Give Me More</Button>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Button { ...props }>Give Me More</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y', },
      { title: '2', author: '2', num_comments: 2, points: 2, objectID: 'z', },
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
    onDismiss: () => {},
  };

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const element = shallow(<Table { ...props } />);

    expect(element.find('.table-row').length).toBe(2);
  });
});
