import { assignParams } from '@utils/assignParams';

export abstract class SerializableEntity<CP, UP, Dto> {
    public abstract get dto(): Dto;

    protected constructor(params: CP) {
        this.checkCreateParams(params);
        this.setParams(params);
    }

    protected setParams(params: CP | UP): void {
        assignParams(this, params as any);
    }

    protected checkCreateParams(params: CP): void {}

}
