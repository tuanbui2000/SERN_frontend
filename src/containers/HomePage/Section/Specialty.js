import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataspecialty: []
        }
    }


    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataspecialty: res.data ? res.data : []
            })
        }
    }


    handleViewlistSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/list/specialty`)
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let { dataspecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.popular-specialties" /></span>
                        <button onClick={() => this.handleViewlistSpecialty()} className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {dataspecialty && dataspecialty.length > 0 &&
                                dataspecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='bg-image  section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            > </div>
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )

                                })
                            }




                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
