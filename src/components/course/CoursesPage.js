import React, {PropTypes} from 'react';
import {connect}  from 'react-redux';
import * as courseActions from "../../actions/courseActions";

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {title: ''}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange (event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, idx) {
    return(
      <div key={idx}>
        {course.title}
      </div>
    );

  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        {courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title} />

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />

      </div>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  courses: state.courses
});


export default connect(mapStateToProps)(CoursesPage);
