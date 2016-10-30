import { Material1Page } from './app.po';

describe('material1 App', function() {
  let page: Material1Page;

  beforeEach(() => {
    page = new Material1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
