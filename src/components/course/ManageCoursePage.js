import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    updateCourseState(event) {
        const fieldName = event.target.name;
        const value = event.target.value;

        const updatedCourse = this.state.course;
        updatedCourse[fieldName] = value;
        this.setState({
            course: updatedCourse
        });
    }

    saveCourse() {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div>
                <CourseForm
                    course={this.state.course}
                    errors={this.state.errors}
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                     />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    actions: PropTypes.object.isRequired,
    course: PropTypes.object,
    authors: PropTypes.array.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, courseId) {
    return courses.find(c => c.id === courseId) || null;
}

function getDefaultCourse() {
    return {
        id: '',
        watchHref:'',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    
    const course = courseId ? getCourseById(state.courses, courseId) : getDefaultCourse();

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);