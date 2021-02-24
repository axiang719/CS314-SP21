import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/FindResponse";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";

export default class Page extends Component {
    constructor(props) {
		super(props);

        this.state = {
            listOfMatches: []
        };
    }
  	
	sendFindRequst(request) {
		sendServerRequest({request})
			.then(findResponse => {
				if (findResponse) {
					this.processFindResponse(findResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed. Please Try Again Later.", "error");
				}
		    });
	}

	processFindResponse(findResponse) {
		if (!isJsonResponseValid(findResponse, findSchema)) {
			this.processServerConfigError("Find Response Not Valid. Check The Server.");
		} else {
			this.processServerFindSuccess(findResponse);
		}
	}

    processServerFindSuccess(findResponse) {
		LOG.info("Receiving find response from:", this.props.serverSettings.serverPort);
		this.setState({listOfMatches: findResponse});
	}
}