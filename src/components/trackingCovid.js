import React from "react";
import '../assests/css/covid.css';
import axios from "axios";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from "react-bootstrap/esm/DropdownItem";

class Covid extends React.Component {
    state = {
        listCovid: [],
        listCountry: [],
        country: "vietnam",
        loading: true
    }

    handleChangeCountry = (cou) => {
        // console.log(">>check Click", cou.Slug);
        this.setState({
            country: cou.Slug
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.country !== this.state.country) {
            // console.log(">>check diff");
            this.setState({ loading: true });
            this.componentDidMount();
        }
    }

    componentDidMount() {
        setTimeout(async () => {
            // console.log(">>>>timeout");
            let covi = await axios.get(`https://api.covid19api.com/dayone/country/${this.state.country}`);
            let country = await axios.get('https://api.covid19api.com/countries');
            this.setState({
                listCovid: covi.data,
                listCountry: country.data,
                loading: false
            });
            // console.log(">>check didmount", this.state);
        }, 3000);
    }

    render() {
        let { listCovid } = this.state;
        let { listCountry } = this.state;
        // console.log(">>>check data: ", this.state);
        // console.log(">>check country: ", this.state.country);
        return (
            <div>

                {/* className="table-wrapper-scroll-y my-custom-scrollbar" */}
                <table className="table table-fixed">
                    <thead>
                        <tr>
                            <th colSpan={6}>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                        value={this.state.country}
                                    >
                                        {this.state.country}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdown-menu">
                                        {listCountry && listCountry.length > 0 &&
                                            listCountry.map((cou, index) =>
                                                <DropdownItem onClick={() => this.handleChangeCountry(cou)} key={index + 1}>{cou.Country}</DropdownItem>
                                            )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </th>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <th>Active</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading === false && listCovid && listCovid.length > 0 &&
                            listCovid
                                .sort((a, b) => a.Date < b.Date ? 1 : -1)
                                .map((covi, index) =>
                                    <tr key={index + 1}>
                                        <td>{covi.Country}</td>
                                        <td>{covi.Active}</td>
                                        <td>{covi.Confirmed}</td>
                                        <td>{covi.Recovered}</td>
                                        <td>{covi.Deaths}</td>
                                        <td>{moment(covi.Date).format('DD/MM/YYYY')}</td>
                                    </tr>
                                )
                        }

                        {this.state.loading === true &&
                            <tr>
                                <td colSpan={6}>Loading....</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Covid;




