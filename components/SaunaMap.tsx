
import React, { useRef, useEffect, useState } from 'react';
import { Sauna } from '../types';

// Let TypeScript know that d3 is available globally.
declare const d3: any;

interface SaunaMapProps {
    saunas: Sauna[];
    onMapClick: (coords: { lat: number; lon: number }) => void;
    onSaunaClick: (sauna: Sauna) => void;
    isLoggedIn: boolean;
}

const SaunaMap: React.FC<SaunaMapProps> = ({ saunas, onMapClick, onSaunaClick, isLoggedIn }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!svgRef.current || !d3) return;

        const { width, height } = dimensions;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const projection = d3.geoMercator()
            .scale(Math.min(width / 2 / Math.PI, height / Math.PI) * 1.2)
            .translate([width / 2, height / 2 * 1.3])
            .center([0, 20]);
        
        const g = svg.append('g');

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', '#a2d5f2')
            .on('click', (event: MouseEvent) => {
                if (!isLoggedIn) return;
                const [lon, lat] = projection.invert(d3.pointer(event));
                onMapClick({ lat, lon });
            });
        
        const zoom = d3.zoom()
            .scaleExtent([1, 12])
            .on('zoom', (event: any) => {
                g.attr('transform', event.transform);
            });
        
        svg.call(zoom);

        const saunaMarkers = g.selectAll('g.sauna')
            .data(saunas, (d: Sauna) => d.id)
            .join(
                (enter: any) => {
                    const group = enter.append('g')
                        .attr('class', 'sauna cursor-pointer')
                        .attr('transform', (d: Sauna) => `translate(${projection([d.longitude, d.latitude])})`)
                        .on('click', (event: MouseEvent, d: Sauna) => {
                            event.stopPropagation();
                            onSaunaClick(d);
                        });

                    group.append('circle')
                        .attr('r', 12)
                        .attr('fill', 'rgba(239, 68, 68, 0.3)')
                        .attr('stroke', 'rgba(239, 68, 68, 0.5)')
                        .attr('stroke-width', 1);

                    group.append('circle')
                        .attr('r', 5)
                        .attr('fill', 'rgb(239, 68, 68)')
                        .attr('stroke', 'white')
                        .attr('stroke-width', 1.5)
                        .style('pointer-events', 'none');
                    
                    group.append('title').text((d: Sauna) => d.name);
                    
                    return group;
                },
                (update: any) => update,
                (exit: any) => exit.remove()
            );

            saunaMarkers.transition()
                .duration(500)
                .attr('transform', (d: Sauna) => `translate(${projection([d.longitude, d.latitude])})`);

    }, [saunas, dimensions, onMapClick, onSaunaClick, isLoggedIn]);

    return (
        <div ref={containerRef} className="w-full h-full relative">
             <svg ref={svgRef} className="w-full h-full" style={{ cursor: isLoggedIn ? 'copy' : 'default' }} />
             {!isLoggedIn && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg font-semibold animate-fade-in">
                     Log in to add new saunas
                 </div>
             )}
        </div>
    );
};

export default SaunaMap;
