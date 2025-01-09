// src/components/influencers/InfluencerNetwork.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Download,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Filter,
    Network
} from 'lucide-react';
import * as d3 from 'd3';
import { influencerNetwork } from '@/data/InfluencerNetworkMockData';

type NodeType = 'politician' | 'analyst' | 'media' | 'academic';
type RelationType = 'ally' | 'opponent' | 'neutral';

interface Node extends d3.SimulationNodeDatum {
    id: string;
    name: string;
    type: NodeType;
    influence: number;
    followers?: number;
    x?: number;
    y?: number;
    fx: number | null;
    fy: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
    strength: number;
    type: RelationType;
    interactions: number;
    lastInteraction: string;
}

export function InfluencerNetwork() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [relationFilter, setRelationFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const width = 800;
    const height = 600;

    // Función para manejar efecto Zoom
    const handleZoomIn = () => {
        const svg = d3.select(svgRef.current);
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4]);

        svg.transition()
            .duration(300)
            .call((t) => zoom.scaleBy(t as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>, 1.2));
    };

    // Función para manejar el zoom out
    const handleZoomOut = () => {
        const svg = d3.select(svgRef.current);
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4]);

        svg.transition()
            .duration(300)
            .call((t) => zoom.scaleBy(t as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>, 0.8));
    };

    // Función para resetear la vista
    const handleReset = () => {
        const svg = d3.select(svgRef.current);
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4]);

        svg.transition()
            .duration(300)
            .call((t) => zoom.transform(t as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>, d3.zoomIdentity));
    };

    useEffect(() => {
        if (!svgRef.current) return;

        // Limpiar SVG existente
        d3.select(svgRef.current).selectAll("*").remove();

        // Filtrar nodos y enlaces según los filtros actuales
        const filteredNodes = (typeFilter === "all"
            ? influencerNetwork.nodes
            : influencerNetwork.nodes.filter(node => node.type === typeFilter)) as Node[];

        const filteredLinks = (relationFilter === "all"
            ? influencerNetwork.links
            : influencerNetwork.links.filter(link => link.type === relationFilter)) as Link[];

        // Configurar el SVG con viewBox para responsivo
        const svg = d3.select(svgRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`);

        // Crear grupo para efecto Zoom
        const g = svg.append("g");

        // Configurar zoom
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
                g.attr("transform", event.transform.toString());
            });

        svg.call(zoom);

        // Crear simulación de fuerzas
        const simulation = d3.forceSimulation<Node>(filteredNodes)
            .force("link", d3.forceLink<Node, Link>(filteredLinks)
                .id(d => d.id)
                .distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(30));

        // Crear enlaces con tipos específicos
        const links = g
            .append("g")
            .selectAll<SVGLineElement, Link>("line")
            .data(filteredLinks)
            .enter()
            .append("line")
            .attr("stroke", (d) => {
                switch (d.type) {
                    case 'ally': return '#22c55e';
                    case 'opponent': return '#ef4444';
                    default: return '#94a3b8';
                }
            })
            .attr("stroke-width", (d) => d.strength * 2)
            .attr("stroke-opacity", 0.6);

        // Configurar el comportamiento de arrastre con tipos
        const drag = d3.drag<SVGGElement, Node>()
            .on("start", function(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                const node = event.subject;
                node.fx = node.x ?? node.fx ?? 0; // Aseguramos que sea number | null
                node.fy = node.y ?? node.fy ?? 0; // Aseguramos que sea number | null
            })
            .on("drag", function(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
                const node = event.subject;
                node.fx = event.x; // event.x es number
                node.fy = event.y; // event.y es number
            })
            .on("end", function(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
                if (!event.active) simulation.alphaTarget(0);
                const node = event.subject;
                node.fx = null;
                node.fy = null;
            });

        // Crear nodos con tipos específicos
        const nodes = g
            .append("g")
            .selectAll<SVGGElement, Node>("g")
            .data(filteredNodes)
            .enter()
            .append("g")
            .call(drag)
            .on("click", (_event: MouseEvent, d: Node) => setSelectedNode(d));

        // Crear círculos para los nodos
        nodes.append("circle")
            .attr("r", d => Math.sqrt(d.influence) * 2)
            .attr("fill", d => {
                switch (d.type) {
                    case 'politician': return '#3b82f6';
                    case 'analyst': return '#8b5cf6';
                    case 'media': return '#ec4899';
                    case 'academic': return '#10b981';
                    default: return '#94a3b8';
                }
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 2);

        // Agregar etiquetas a los nodos
        nodes.append("text")
            .text(d => d.name)
            .attr("x", 12)
            .attr("y", 4)
            .attr("font-size", "10px")
            .attr("fill", "currentColor");

        // Actualizar posiciones en cada tick de la simulación con manejo de undefined
        simulation.on("tick", () => {
            links
                .attr("x1", d => {
                    const source = d.source as Node;
                    return source.x ?? 0;
                })
                .attr("y1", d => {
                    const source = d.source as Node;
                    return source.y ?? 0;
                })
                .attr("x2", d => {
                    const target = d.target as Node;
                    return target.x ?? 0;
                })
                .attr("y2", d => {
                    const target = d.target as Node;
                    return target.y ?? 0;
                });

            nodes.attr("transform", d => `translate(${d.x ?? 0},${d.y ?? 0})`);
        });

        // Limpieza cuando el componente se desmonte
        return () => {
            simulation.stop();
        };
    }, [relationFilter, typeFilter, width, height]);

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Network className="w-5 h-5"/>
                                Red de Relaciones
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleZoomIn}
                                title="Acercar"
                            >
                                <ZoomIn className="w-4 h-4"/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleZoomOut}
                                title="Alejar"
                            >
                                <ZoomOut className="w-4 h-4"/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                title="Restablecer vista"
                            >
                                <RotateCcw className="w-4 h-4"/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                title="Descargar grafo"
                            >
                                <Download className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground"/>
                            <span className="text-sm">Filtros:</span>
                        </div>
                        <Select value={relationFilter} onValueChange={setRelationFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tipo de relación"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las relaciones</SelectItem>
                                <SelectItem value="ally">Aliados</SelectItem>
                                <SelectItem value="opponent">Opositores</SelectItem>
                                <SelectItem value="neutral">Neutrales</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Tipo de actor"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los tipos</SelectItem>
                                <SelectItem value="politician">Políticos</SelectItem>
                                <SelectItem value="analyst">Analistas</SelectItem>
                                <SelectItem value="media">Medios</SelectItem>
                                <SelectItem value="academic">Académicos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Panel de visualización del grafo */}
                        <div className="lg:col-span-3 bg-muted/30 rounded-lg overflow-hidden">
                            <svg ref={svgRef} className="w-full h-[600px]"/>
                        </div>

                        {/* Panel lateral de detalles y leyenda */}
                        <div className="space-y-4">
                            {/* Panel de detalles del nodo seleccionado */}
                            <Card>
                                <CardContent className="pt-6">
                                    {selectedNode ? (
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold">{selectedNode.name}</h3>
                                                <p className="text-sm text-muted-foreground capitalize">
                                                    {selectedNode.type}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">
                                                        Influencia
                                                    </span>
                                                    <span className="font-medium">
                                                        {selectedNode.influence}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-muted-foreground">
                                                        Conexiones
                                                    </span>
                                                    <span className="font-medium">
                                                        {influencerNetwork.links.filter(
                                                            link =>
                                                                link.source === selectedNode.id ||
                                                                link.target === selectedNode.id
                                                        ).length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground">
                                            <p>Selecciona un nodo para ver detalles</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Leyenda del grafo */}
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-4">Leyenda</h3>
                                    {/* Tipos de nodos */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"/>
                                            <span className="text-sm">Políticos</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-purple-500"/>
                                            <span className="text-sm">Analistas</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-pink-500"/>
                                            <span className="text-sm">Medios</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"/>
                                            <span className="text-sm">Académicos</span>
                                        </div>
                                    </div>
                                    {/* Tipos de relaciones */}
                                    <div className="mt-4 pt-4 border-t space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-0.5 bg-green-500"/>
                                            <span className="text-sm">Aliados</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-0.5 bg-red-500"/>
                                            <span className="text-sm">Opositores</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-0.5 bg-slate-400"/>
                                            <span className="text-sm">Neutrales</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}