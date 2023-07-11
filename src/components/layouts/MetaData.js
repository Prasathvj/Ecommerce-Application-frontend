import React from 'react'
import { Helmet } from 'react-helmet-async'
function MetaData({title}) {
  return (
    <Helmet>
        <title>{`${title}-VJ Cart`}</title>
    </Helmet>
  )
}

export default MetaData