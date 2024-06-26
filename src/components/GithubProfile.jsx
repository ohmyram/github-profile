import React, { useEffect, useState } from 'react'
import RepositoryCard from "./RepositoryCard"


export default function GithubProfile({ dataProfile }) {

    const [repositories, setRepositories] = useState()
    const [showMoreRepos, setShowMoreRepos] = useState(false)

    const getRepositories = (user) => {
        console.log("getRepositories GithubProfile.jsx")
        const url = `https://api.github.com/users/${user}/repos`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRepositories(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        console.log("useEffect GithubProfile.jsx")
        setShowMoreRepos(false)
        const user = dataProfile.login
        getRepositories(user)
    }, [dataProfile])

    const handleShowMoreRepos = () => {
        console.log("handleShowMoreRepos GithubProfile.jsx")
        showMoreRepos ? setShowMoreRepos(false) : setShowMoreRepos(true)
    }


    return (
        <main className='flex flex-col items-center h-fit mx-[50px] bg-[#20293A]'>
            <header className='w-fit relative lg:w-[1000px] first-letter:px-90 '>
                <div className='flex flex-col lg:flex-row lg:justify-center lg:items-center	gap-[20px] justify-center text-[16px] font-medium'>
                    <div className='flex bg-[#111729] w-fit py-[16px] rounded-xl'>
                        <span className="text-[#364153] px-[20px] border-r border-[#364153]">Followers</span>
                        <span className="text-[#CDD5E0] px-[20px]">{dataProfile.followers}</span>
                    </div>
                    <div className='flex bg-[#111729] w-fit py-[16px] rounded-xl'>
                        <span className="text-[#364153] px-[20px] border-r border-[#364153]">Following</span>
                        <span className="text-[#CDD5E0] px-[20px]">{dataProfile.following}</span>
                    </div>
                    <div className='flex bg-[#111729] w-fit py-[16px] rounded-xl'>
                        <span className="text-[#364153] px-[20px] border-r border-[#364153]">Location</span>
                        <span className="text-[#CDD5E0] px-[20px]">{dataProfile.location}</span>
                    </div>
                </div>
                <div className=" absolute top-[-60px] left-[-170px] lg:bottom-[-15px] lg:left-0 rounded-2xl	 bg-[#20293A] size-[140px]" >
                    <img className=" absolute size-[120px] rounded-2xl	 bottom-[10px] left-[10px]" src={dataProfile.avatar_url}></img>
                </div>
            </header>

            <main className='lg-[1000px] flex flex-col mt-[40px] h-full bg-[#20293A]'>
                <h1 className='text-[#CDD5E0] text-[32px]'>{dataProfile.name}</h1>
                <h2 className='text-[#CDD5E0] text-[16px] mt-[8px]'>{dataProfile.bio}</h2>
                <section className='mt-[34px] flex flex-col lg:grid lg:grid-cols-2 h-full gap-y-[34px] gap-x-[32px] bg-[#20293A]'>
                    {
                        repositories ? (
                            repositories.length > 4 ? (
                                showMoreRepos ? (
                                    repositories.map(repository => (<RepositoryCard key={repository.id} data={repository} user={dataProfile.login} />))
                                ) : (
                                    repositories.slice(0, 4).map(repository => (<RepositoryCard key={repository.id} data={repository} user={dataProfile.login} />))
                                )
                            )
                                : (repositories.map(repository => (<RepositoryCard key={repository.id} data={repository} user={dataProfile.login} />))
                                )
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </section>
                <span onClick={handleShowMoreRepos} className='text-[#CDD5E0] text-center mt-[46px] mb-[100px]'>View all repositories</span>
            </main>
        </main>
    )
}
