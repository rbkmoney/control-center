import {
    CancellationToken,
    CodeLens,
    CodeLensList,
    CodeLensProvider,
    ITextModel,
    ProviderResult,
} from '../../monaco-editor';

export class DomainObjCodeLensProvider implements CodeLensProvider {
    get language() {
        return 'json';
    }

    provideCodeLenses(model: ITextModel): ProviderResult<CodeLensList> {
        const range = monaco.Range.fromPositions(model.getPositionAt(5), model.getPositionAt(8));
        return {
            lenses: [
                {
                    range,
                    id: 'First Line',
                    command: {
                        id: null,
                        title: 'DomainRef',
                    },
                },
            ],
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            dispose: () => {},
        };
    }
    resolveCodeLens?(
        model: ITextModel,
        codeLens: CodeLens,
        token: CancellationToken
    ): ProviderResult<CodeLens>;
}
