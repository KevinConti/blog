import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import SEO from '../components/seo'
import Pills from '../components/pills'
import Bio from '../components/bio'
import Embed from '../components/embed'
import { formatPostDate, formatReadingTime } from '../utils/dates'

import NetlifyForm from 'react-netlify-form'

import './blog-post.css'

export default function PageTemplate({ data: { mdx, site }, pageContext }) {
  const { previous, next } = pageContext
  const publicUrl = `${site.siteMetadata.siteUrl}${mdx.fields.slug}`

  return (
    <div>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        canonicalLink={mdx.frontmatter.canonical_link}
        keywords={mdx.frontmatter.categories || []}
        meta={[
          {
            name: 'twitter:label1',
            content: 'Reading time',
          },
          {
            name: 'twitter:data1',
            content: `${mdx.timeToRead} min read`,
          },
        ]}
      />
      <section className="center blog">
        <article className="container small">
          <header>
            <h1>
              <Link to="/">«</Link> {mdx.frontmatter.title}
            </h1>
            <p>
              {formatPostDate(mdx.frontmatter.date)}
              {` • ${formatReadingTime(mdx.timeToRead)}`}
            </p>
            <Pills items={mdx.frontmatter.categories} />
          </header>

          <MDXRenderer scope={{ Embed }}>{mdx.code.body}</MDXRenderer>
        </article>
        <footer className="container small">
          <small>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`https://twitter.com/search?q=${publicUrl}`}
            >
              Discuss on Twitter
            </a>{' '}
            &middot;{' '}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`${site.siteMetadata.githubUrl}/edit/master/content${
                mdx.fields.slug
              }index.md`}
            >
              Edit this post on GitHub
            </a>
          </small>
          <hr
            style={{
              margin: `24px 0`,
            }}
          />
          <Bio />
          <p>Want to be notified when I post?</p>
          <NetlifyForm name='Contact Form'>
            {({ loading, error, success }) => (
              <div>
                {loading &&
                  <div>Loading...</div> 
                }
                {error &&
                  <div>Your information was not sent. Please try again later.</div>
                }
                {success &&
                  <div>Thank you for contacting us!</div>
                }
                {!loading && !success &&
                  <div>
                    <input type="hidden" name="form-name" value="contact" />
                    <p>
                      <label>Your Name: <input type="text" name="name"/></label>
                    </p>
                    <p>
                      <label>Your Email: <input type="email" name="email"/></label>
                    </p>
                    <p>
                      <button type="submit">Send</button>
                    </p>
                  </div>
                }
              </div>
            )}
          </NetlifyForm>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          
        </footer>
      </section>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
        githubUrl
      }
    }
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        description
        categories
        date(formatString: "MMMM DD, YYYY")
        canonical_link
      }
      code {
        body
      }
    }
  }
`
