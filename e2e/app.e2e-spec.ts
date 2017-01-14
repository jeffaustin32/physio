import { PhysioPage } from './app.po';

describe('physio App', function() {
  let page: PhysioPage;

  beforeEach(() => {
    page = new PhysioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
