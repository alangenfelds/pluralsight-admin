import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from 'toastr';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm";

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.courseId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then( () => this.redirect())
      .catch(err => {
        toastr.error(err);
        this.setState({saving: false});
      })
  }

  redirect() {
    this.setState({saving: false});
    toastr.success("Course saved");
    this.context.router.push('/courses');
  }

  render() {
    const { authors } = this.props;
    return (
      <CourseForm
        allAuthors={authors}
        let course ={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        loading={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const getCourseById = (courses, courseId) => {
  const course = courses.filter( course => course.id == courseId);
  if (course) return course[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {

  const courseId = ownProps.params.id;

  let course = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };


  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }


  // const authorsFormattedForDropdown = state.authors.map(author => {
  //   return {
  //     value: author.id,
  //     text: author.firstName + ' ' + author.lastName
  //   };
  // });


  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
