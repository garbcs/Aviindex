import React, { useState, useCallback } from "react";

function Ferramenta() {
    const [pesoInicial, setPesoInicial] = useState("");
    const [pesoFinal, setPesoFinal] = useState("");
    const [consumoRacao, setConsumoRacao] = useState("");
    const [resultado, setResultado] = useState("");
    const [dados, setDados] = useState("");
    const [abaAtiva, setAbaAtiva] = useState("igpa"); // controla qual ferramenta exibir

    const calcularIGPA = useCallback(() => {
        const pi = parseFloat(pesoInicial);
        const pf = parseFloat(pesoFinal);
        const cr = parseFloat(consumoRacao);

        if (isNaN(pi) || isNaN(pf) || isNaN(cr) || cr <= 0 || pf <= pi) {
            setResultado(<p className="erro">Preencha todos os campos corretamente!</p>);
            setDados("");
            return;
        }

        setDados(
            <>
                <strong>Dados informados:</strong><br />
                Peso Inicial: {pi.toFixed(2)} kg<br />
                Peso Final: {pf.toFixed(2)} kg<br />
                Consumo de Ração: {cr.toFixed(2)} kg
            </>
        );

        const indice = (pf - pi) / cr;
        let interpretacao = "";

        if (indice > 0.6) {
            interpretacao = <b>Excelente conversão alimentar.</b>;
        } else if (indice >= 0.5) {
            interpretacao = <b>Boa conversão alimentar.</b>;
        } else {
            interpretacao = <b>Conversão alimentar baixa.</b>;
        }

        setResultado(
            <>
                Índice de Ganho de Peso Alimentar (IGPA): <strong>{indice.toFixed(4)}</strong><br />
                {interpretacao}
            </>
        );
    }, [pesoInicial, pesoFinal, consumoRacao]);

    const calcularICA = useCallback(() => {
        const pi = parseFloat(pesoInicial);
        const pf = parseFloat(pesoFinal);
        const cr = parseFloat(consumoRacao);

        if (isNaN(pi) || isNaN(pf) || isNaN(cr) || cr <= 0 || pf <= pi) {
            setResultado(<p className="erro">Preencha todos os campos corretamente!</p>);
            setDados("");
            return;
        }

        const ganho = pf - pi;
        setDados(
            <>
                <strong>Dados informados:</strong><br />
                Peso Inicial: {pi.toFixed(2)} kg<br />
                Peso Final: {pf.toFixed(2)} kg<br />
                Ganho de Peso: {ganho.toFixed(2)} kg<br />
                Consumo de Ração: {cr.toFixed(2)} kg
            </>
        );

        const ica = cr / ganho;
        let interpretacao = "";

        if (ica < 1.8) {
            interpretacao = <b>Excelente eficiência alimentar (ICA baixo).</b>;
        } else if (ica < 2.0) {
            interpretacao = <b>Boa eficiência alimentar.</b>;
        } else {
            interpretacao = <b>Eficiência alimentar baixa (ICA alto).</b>;
        }

        setResultado(
            <>
                Índice de Conversão Alimentar (ICA): <strong>{ica.toFixed(4)}</strong><br />
                {interpretacao}
            </>
        );
    }, [pesoInicial, pesoFinal, consumoRacao]);

    const calcularIEA = useCallback(() => {
        const pi = parseFloat(pesoInicial);
        const pf = parseFloat(pesoFinal);
        const cr = parseFloat(consumoRacao);

        if (isNaN(pi) || isNaN(pf) || isNaN(cr) || cr <= 0 || pf <= pi) {
            setResultado(<p className="erro">Preencha todos os campos corretamente!</p>);
            setDados("");
            return;
        }

        const ganho = pf - pi;
        setDados(
            <>
                <strong>Dados informados:</strong><br />
                Peso Inicial: {pi.toFixed(2)} kg<br />
                Peso Final: {pf.toFixed(2)} kg<br />
                Ganho de Peso: {ganho.toFixed(2)} kg<br />
                Consumo de Ração: {cr.toFixed(2)} kg
            </>
        );

        const iea = (ganho / cr) * 100;
        let interpretacao = "";

        if (iea > 50) {
            interpretacao = <b>Excelente eficiência energética (IEA alto).</b>;
        } else if (iea > 40) {
            interpretacao = <b>Boa eficiência energética.</b>;
        } else {
            interpretacao = <b>Eficiência energética baixa.</b>;
        }

        setResultado(
            <>
                Índice de Eficiência Alimentar (IEA): <strong>{iea.toFixed(2)}%</strong><br />
                {interpretacao}
            </>
        );
    }, [pesoInicial, pesoFinal, consumoRacao]);

    const limparCampos = useCallback(() => {
        setPesoInicial("");
        setPesoFinal("");
        setConsumoRacao("");
        setResultado("");
        setDados("");
    }, []);

    const calcularAtual = useCallback(() => {
        if (abaAtiva === "igpa") calcularIGPA();
        else if (abaAtiva === "ica") calcularICA();
        else if (abaAtiva === "iea") calcularIEA();
    }, [abaAtiva, calcularIGPA, calcularICA, calcularIEA]);

    return (
        <section id="Ferramenta" className="Ferramenta_section">
            <div>
                <h2 className="h2_ferramenta">Calculadora de Índices Alimentares</h2>

                {/* Abas de navegação */}
                <div className="abas_ferramenta">
                    <button 
                        className={`aba_btn ${abaAtiva === "igpa" ? "ativa" : ""}`}
                        onClick={() => {
                            setAbaAtiva("igpa");
                            setResultado("");
                            setDados("");
                        }}
                        aria-label="Calcular IGPA"
                        aria-pressed={abaAtiva === "igpa"}
                    >
                        IGPA
                    </button>
                    <button 
                        className={`aba_btn ${abaAtiva === "ica" ? "ativa" : ""}`}
                        onClick={() => {
                            setAbaAtiva("ica");
                            setResultado("");
                            setDados("");
                        }}
                        aria-label="Calcular ICA"
                        aria-pressed={abaAtiva === "ica"}
                    >
                        ICA
                    </button>
                    <button 
                        className={`aba_btn ${abaAtiva === "iea" ? "ativa" : ""}`}
                        onClick={() => {
                            setAbaAtiva("iea");
                            setResultado("");
                            setDados("");
                        }}
                        aria-label="Calcular IEA"
                        aria-pressed={abaAtiva === "iea"}
                    >
                        IEA
                    </button>
                </div>

                {/* Conteúdo IGPA */}
                {abaAtiva === "igpa" && (
                    <div className="aba_conteudo">
                        <div className="descricao_ferramenta">
                            <p className="descricao_p">O IGPA (Índice de Ganho de Peso Alimentar) avalia a eficiência das aves na conversão da ração em peso corporal.</p>
                            <strong>Fórmula: (Peso Final - Peso Inicial) / Consumo de Ração</strong>
                            <p className="avisoKG">O cálculo está em quilogramas (kg); se necessário, faça a conversão antes de utilizá-lo.</p>
                        </div>

                        <div>
                            <strong><p className="interpretacao">Interpretação</p></strong>
                            <ul className="ul_ferramenta">
                                <li className="li_ferramenta"><b>Excelente (Maior que  0.6):</b> Conversão alimentar ótima.</li>
                                <li className="li_ferramenta"><b>Bom (0.5 - 0.6):</b> Conversão adequada.</li>
                                <li className="li_ferramenta"><b>Baixo ( Menor que0.5):</b> Conversão insatisfatória.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Conteúdo ICA */}
                {abaAtiva === "ica" && (
                    <div className="aba_conteudo">
                        <div className="descricao_ferramenta">
                            <p className="descricao_p">O ICA (Índice de Conversão Alimentar) mede quanto de ração é necessário para produzir 1 kg de ganho de peso.</p>
                            <strong>Fórmula: Consumo de Ração / (Peso Final - Peso Inicial)</strong>
                            <p className="avisoKG">Quanto menor o ICA, melhor a eficiência alimentar. Valores típicos: 1.8 a 2.2 kg.</p>
                            <p className="avisoKG">O cálculo está em quilogramas (kg); se necessário, faça a conversão antes de utilizá-lo.</p>
                        </div>

                        <div>
                            <strong><p className="interpretacao">Interpretação</p></strong>
                            <ul className="ul_ferramenta">
                                <li className="li_ferramenta"><b>Excelente (Menor que 1.8):</b> Excelente eficiência.</li>
                                <li className="li_ferramenta"><b>Bom (1.8 - 2.0):</b> Boa eficiência.</li>
                                <li className="li_ferramenta"><b>Baixo (Maior que 2.0):</b> Eficiência insatisfatória.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Conteúdo IEA */}
                {abaAtiva === "iea" && (
                    <div className="aba_conteudo">
                        <div className="descricao_ferramenta">
                            <p className="descricao_p">O IEA (Índice de Eficiência Alimentar) representa o ganho de peso em relação ao consumo total de ração, expresso em percentual.</p>
                            <strong>Fórmula: [(Peso Final - Peso Inicial) / Consumo de Ração] × 100</strong>
                            <p className="avisoKG">Quanto maior o IEA, melhor a eficiência na utilização da ração.</p>
                            <p className="avisoKG">O cálculo está em quilogramas (kg); se necessário, faça a conversão antes de utilizá-lo.</p>
                        </div>

                        <div>
                            <strong><p className="interpretacao">Interpretação</p></strong>
                            <ul className="ul_ferramenta">
                                <li className="li_ferramenta"><b>Excelente ( Maior que 50%):</b> Excelente eficiência energética.</li>
                                <li className="li_ferramenta"><b>Bom (40 - 50%):</b> Boa eficiência energética.</li>
                                <li className="li_ferramenta"><b>Baixo ( Menor que 40%):</b> Eficiência energética baixa.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Inputs comuns */}
                <div className="form_grid">
                    <div className="form_group">
                        <label className="label_ferramenta" htmlFor="pesoInicial">Peso Inicial (kg)</label>
                        <input
                            type="number"
                            id="pesoInicial"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 0.5"
                            value={pesoInicial}
                            onChange={e => setPesoInicial(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label className="label_ferramenta" htmlFor="pesoFinal">Peso Final (kg)</label>
                        <input
                            type="number"
                            id="pesoFinal"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 2.5"
                            value={pesoFinal}
                            onChange={e => setPesoFinal(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label className="label_ferramenta" htmlFor="consumoRacao">Consumo de Ração (kg)</label>
                        <input
                            type="number"
                            id="consumoRacao"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 5.0"
                            value={consumoRacao}
                            onChange={e => setConsumoRacao(e.target.value)}
                        />
                    </div>
                </div>

                <div className="buttons_group">
                    <button 
                        className="button_ferramenta" 
                        type="button" 
                        onClick={calcularAtual}
                        aria-label="Calcular índice alimentar"
                    >
                        Calcular Índice
                    </button>
                    <button 
                        className="limpar_ferramenta" 
                        type="button" 
                        onClick={limparCampos}
                        aria-label="Limpar campos"
                    >
                        <i className="fa-solid fa-trash-can" aria-hidden="true" /> Limpar
                    </button>
                </div>

                {dados && (
                    <div className="informacoes" id="dadosInformados">{dados}</div>
                )}
                {resultado && (
                    <div className="resultado" id="resultado">{resultado}</div>
                )}

                <div>
                    <a href="https://dzo.ufla.br/Roberto/transparencias/indice_alimentar.pdf" target="_blank" rel="noopener noreferrer">
                        Referência: UFLA - Índice Alimentar
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Ferramenta;