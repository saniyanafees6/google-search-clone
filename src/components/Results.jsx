import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../contexts/ResultContextProvider'
import { Loading } from './'

const Results = () => {
    const { getResults, results, searchTerm, isLoading } = useResultContext()
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            if(location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`)
            } else {
                getResults(`${location.pathname}/q=${searchTerm}&num=40`)
            }
        }
        
    }, [searchTerm, location.pathname])

    if(isLoading) return <Loading />
    console.log(location.pathname)
    switch(location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {results?.map(( { link, title }, index ) => (
                        <div key={index} className='md:w-2/5 w-full'>
                            <a href={link} target='_blank' rel='noreferrer'>
                                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: { href, title } }, index) => (
                        <a href={href} key={index} target='_blank' rel='noreferrer' className="sm:p-3 p-5">
                            <img src={image?.src} alt={title} loading='lazy' />
                            <p className="w-36 break-words text-sm mt-2">{title}</p>
                        </a>
                    ))}
                </div>
            )
        case '/videos':
            return (
                <div className="flex flex-wrap">
                    {results.map((video, index) => (
                        <div key={index} className="p-2">
                            {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width='355px' height='200px' />}
                        </div>
                    ))}
                </div>
            )
        default: 
            return 'Error';
    }
}

export default Results