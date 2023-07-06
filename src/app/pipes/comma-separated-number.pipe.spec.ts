import { CommaSeparatedNumberPipe } from './comma-separated-number.pipe';

describe('CommaSeparatedNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CommaSeparatedNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
