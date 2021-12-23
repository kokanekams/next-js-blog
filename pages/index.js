import { useState, useEffect } from 'react';
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { CookiesProvider, useCookies } from 'react-cookie';
import CookieModal from '../components/CookieConsentWithTrackers';

const defaultCookieSettings = {maraketing: false, targeting: false, advertisement: false, bareminimum: true};

export default function Index({ allPosts }) {

  const [cookies, setCookie] = useCookies(['test-cookie']);
  const [showCookieModal, setCookieModal] = useState(true);

  let cookieSettings = defaultCookieSettings;

  useEffect(() => {
    if (cookies['consent-cookie-configured'] === 'yes') {
      // The cookie settings have already been configured. So don't show the modal
      setCookieModal(false);
    }
    // console.log('cookies: ', cookies);
    // setCookie('test-cookie', 'cookie-value', { path: '/' });
  }, []);

  function onCookieSet(cookiesToSet=defaultCookieSettings) {
    // In case of cancel button clicked, this gets called with the default cookies

    for (let prop of Object.entries(cookiesToSet)) {
      let value = prop[1] ? 'yes' : 'no';
      setCookie(`consent-cookie-${prop[0]}`, value);
    }

    // mark that cookies have been set
    setCookie('consent-cookie-configured', 'yes');

    // hide the modal this one time
    setCookieModal(false);
  }
  
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <CookiesProvider>
        <Layout>
          <Head>
            <title>Next.js Blog Example with {CMS_NAME}</title>
          </Head>
          <Container>
            <Intro />
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>
          {showCookieModal && <CookieModal cookieSettings={defaultCookieSettings} onCookieSet={onCookieSet}/>}
        </Layout>
      </CookiesProvider>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
