import { useState } from 'react';

const template = {
    main: {
      header: 'Privacy Settings',
      content: 'Please manage your choices by switching the consent toggles on or off under the purposes listed below. We will tweak the settings based on your choices.'
    },
    categories: [
      {
        id: 'maraketing',
        header: 'Marketing',
        content: 'Toggling this setting will enable the marketing cookies to be set on your browser which can be used for marketing purposes.',
        checked: false
      },
      {
        id: 'targeting',
        header: 'Targeting',
        content: 'Toggling this setting will enable the targeting cookies to be set on your browser which can be used for targeting purposes.',
        checked: false
      },
      {
        id: 'advertisement',
        header: 'Advertisement',
        content: 'Toggling this setting will enable the advertisement cookies to be set on your browser which can be used for advertisement purposes.',
        checked: false
      },
      {
        id: 'bareminimum',
        header: 'Bare minimum',
        content: 'Toggling this setting will enable the bare minimum cookies to be set which will allow the site to function without any hassles.',
        checked: false
      }
    ]
  }

function CategoryElement({category, checked, onTrackerChanged}) {
    return (
        <>
        <div className="heading row">
            <h3>{category.header}</h3>
            <Toggle checked={checked} onTrackerChanged={onTrackerChanged} id={category.id} />
        </div>
        <div className="content">
            {category.content}
        </div>
        </>
    )
}
  
export default function CookieModal({cookieSettings, onCookieSet}) {
    const policy = template.main;
    const categories = template.categories;

    const [trackers, setTrackers] = useState(cookieSettings);

    function onTrackerChanged(trackerId) {
        const currentValue = trackers[trackerId];

        setTrackers({...trackers, ...{[trackerId]: !currentValue}});
    }

    return (
        <div id="js-cookie-box" className="cookie-box cookie-box--hide">
        <div className="heading row">
            <h2>{policy.header}</h2>
        </div>
        <div className="content">
            {policy.content}
        </div>
        <br />
        <hr />
        <div className="categories">
            {categories.map((category) => 
                <CategoryElement key={category.id} category={category} checked={trackers[category.id]} onTrackerChanged={onTrackerChanged}/>         
            )}
        </div>
        <div className="footer">
            <span id="js-cookie-button" className="cookie-button" onClick={() => onCookieSet(trackers)}>Accept</span>
            <span id="js-cookie-button" className="cookie-button cancel-button" onClick={() => onCookieSet()}>Cancel</span>
        </div>
        </div>
    )
}
  
// -------------------------------------------------------------------------------
// This is the toggle switch which we are creating custom
function Toggle({checked, onTrackerChanged, id}) {
    return (
        <>
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={() => onTrackerChanged(id)}/>
            <span className="slider round"></span>
        </label>
        </>
    )
}