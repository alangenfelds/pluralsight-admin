import expect from 'expect';
import { authorsFormattedForDropdown } from './selectors';

describe('Author Selectors', () => {
  it('should return author data formatted for use in a dropdown', () => {
    const authors = [
      {id: 'abc', firstName: 'Cat', lastName: 'Tom'},
      {id: 'asd', firstName: 'Mouse', lastName: 'Jerry'}
    ];

    const expected = [
      {value: 'abc', text: 'Cat Tom'},
      {value: 'asd', text: 'Mouse Jerry'}
    ];

    expect(authorsFormattedForDropdown(authors)).toEqual(expected);
  });
});
