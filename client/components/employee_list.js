import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {

    componentWillMount() {
        this.page = 1;
    }

    handleButtonClick() {
        console.log(this.page)
        Meteor.subscribe('employees', PER_PAGE * this.page+1);
        this.page += 1;
    }
    render() {
        return (
            <div>
                <div className="employee-list">
                    { this.props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee}/>) }
                </div>
                <button onClick={this.handleButtonClick.bind(this)} className="btn btn-primary">Load More...</button>
            </div>
        );
    }
};

export default withTracker(() => {
    Meteor.subscribe('employees', PER_PAGE);
    return { employees: Employees.find({}).fetch()};

}) (EmployeeList);