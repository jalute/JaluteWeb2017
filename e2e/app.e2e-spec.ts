import { JaluteWeb2017Page } from './app.po';

describe('jalute-web2017 App', () => {
  let page: JaluteWeb2017Page;

  beforeEach(() => {
    page = new JaluteWeb2017Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
