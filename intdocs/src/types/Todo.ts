export interface Todo {
	name: string;
	creation: string;
	modified: string;
	modified_by: string;
	owner: string;
	docstatus: number;
	idx: number;
	status: string;
	priority: string;
	color?: any;
	date: string;
	allocated_to: string;
	description: string;
	reference_type: string;
	reference_name: string;
	role?: any;
	assigned_by: string;
	assigned_by_full_name: string;
	sender?: any;
	assignment_rule?: any;
	_user_tags?: any;
	_comments?: any;
	_assign?: any;
	_liked_by?: any;
	_seen?: any;
	assigmentverdict: string;
  assigmentverdictcomment? : string;
}