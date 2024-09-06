import HomeLoader from './HomeLoader/HomeLoader'
import './PageLoader.css'

const PageLoader = ({ dataLoading }) => {

    return (
        <div>
            {
                localStorage.getItem('user') !== null &&
                    !dataLoading ? <div className='page-loader'>
                    <HomeLoader />
                </div> : null
            }
        </div>
    )
}

export default PageLoader
