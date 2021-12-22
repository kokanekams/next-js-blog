const template = {
    main: {
      header: 'Privacy Settings',
      content: 'Please manage your choices by switching the consent toggles on or off under the purposes listed below. We will tweak the settings based on your choices.'
    },
    categories: [
      {
        header: 'Marketing',
        content: 'Toggling this setting will enable the marketing cookies to be set on your browser which can be used for marketing purposes.',
        checked: false
      },
      {
        header: 'Targeting',
        content: 'Toggling this setting will enable the targeting cookies to be set on your browser which can be used for targeting purposes.',
        checked: false
      },
      {
        header: 'Advertisement',
        content: 'Toggling this setting will enable the advertisement cookies to be set on your browser which can be used for advertisement purposes.',
        checked: false
      },
      {
        header: 'Bare minimum',
        content: 'Toggling this setting will enable the bare minimum cookies to be set which will allow the site to function without any hassles.',
        checked: false
      }
    ]
  }

function CategoryElement({category}) {
    return (
        <>
        <div class="heading row">
            <h3>{category.header}</h3>
            <Toggle />
        </div>
        <div class="content">
            {category.content}
        </div>
        </>
    )
}
  
export default function CookieModal() {
    const policy = template.main;
    const categories = template.categories;

    return (
        <div id="js-cookie-box" class="cookie-box cookie-box--hide">
        <div class="heading row">
            <h2>{policy.header}</h2>
        </div>
        <div class="content">
            {policy.content}
        </div>
        <br />
        <hr />
        <div class="categories">
            {categories.map((category) => 
            <CategoryElement category={category} />         
            )}
        </div>
        <div class="footer">
            <span id="js-cookie-button" class="cookie-button">Accept</span>
            <span id="js-cookie-button" class="cookie-button cancel-button">Cancel</span>
        </div>
        </div>
    )
}
  
// -------------------------------------------------------------------------------
// This is the toggle switch which we are creating custom
function Toggle() {
    return (
        <>
        <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
        </label>
        </>
    )
}