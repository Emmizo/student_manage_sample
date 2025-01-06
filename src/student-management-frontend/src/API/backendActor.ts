import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory} from "../../../declarations/student-management-backend";
import canisterIds from "../../../../.dfx/local/canister_ids.json";

const backendCanisterId = canisterIds["student-management-backend"]?.local;
const agent = HttpAgent.createSync({
    host: "http://127.0.0.1:4943",
});
agent.fetchRootKey();
const backendActor = Actor.createActor(idlFactory,{
    agent,
    canisterId: backendCanisterId,
});

export default backendActor;