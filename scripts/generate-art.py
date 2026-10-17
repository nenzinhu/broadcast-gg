"""Generate original, dependency-free editorial illustrations for the demo catalog."""
from pathlib import Path
import random

OUT = Path(__file__).resolve().parents[1] / 'public' / 'art'
random.seed(71)


def save(name, top, bottom, body):
    stars = ''.join(f'<circle cx="{random.randrange(900)}" cy="{random.randrange(450)}" r="{random.choice([.6,.8,1.2])}" fill="#f5edd3" opacity="{random.uniform(.08,.4):.2f}"/>' for _ in range(100))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient><radialGradient id="light"><stop stop-color="#e9d99a" stop-opacity=".55"/><stop offset="1" stop-color="#e9d99a" stop-opacity="0"/></radialGradient><linearGradient id="shade" x2="0" y2="1"><stop stop-color="#030908" stop-opacity="0"/><stop offset="1" stop-color="#030908" stop-opacity=".8"/></linearGradient></defs><path d="M0 0h900v560H0z" fill="url(#sky)"/>{stars}{body}<path d="M0 430h900v130H0z" fill="url(#shade)"/></svg>'''
    (OUT / f'{name}.svg').write_text(svg)

# A rain-soaked architectural city with warm reflected windows.
city = '<ellipse cx="580" cy="220" rx="390" ry="290" fill="url(#light)"/>'
for layer in range(3):
    for i in range(13):
        x = i * 80 - layer * 28
        y = random.randrange(100, 300) + layer * 35
        width = random.randrange(35, 72)
        city += f'<path d="M{x} 500V{y}h{width}v{500-y}z" fill="{["#535846","#273b36","#102725"][layer]}"/>'
        if layer > 0:
            for wx in range(x + 8, x + width - 4, 12):
                for wy in range(y + 12, 480, 18):
                    if random.random() > .55:
                        city += f'<path d="M{wx} {wy}h3v7h-3z" fill="#d5bb69" opacity="{random.uniform(.25,.7):.2f}"/>'
city += '<path d="M550 80V470h-32V80l16-30z" fill="#263c34"/><path d="M534 60v215" stroke="#c4ca85" stroke-width="3"/><path d="M0 450 900 390v170H0" fill="#0c211e"/><path d="M0 490 900 423" stroke="#afc290" stroke-width="2" opacity=".45"/><path d="M210 560 580 434M600 560 640 431" stroke="#8d9e68" opacity=".4" stroke-width="3"/><path d="M635 438l-10 55h43l-11-55-7-8z" fill="#040c0c"/><circle cx="646" cy="424" r="8" fill="#040c0c"/><path d="M0 110h195v290H0z" fill="#0c1c1b"/><path d="M163 160h18v137h-18z" fill="#dfae51"/><path d="M168 170v115" stroke="#fff0bb" stroke-width="2"/>'
save('cyberpunk', '#7d7953', '#122d2a', city)

# Golden branching tree, ancient arches and a distant traveller.
tree = '<ellipse cx="590" cy="130" rx="350" ry="320" fill="url(#light)"/><circle cx="594" cy="166" r="146" fill="none" stroke="#d5c683" opacity=".3"/><circle cx="594" cy="166" r="132" fill="none" stroke="#d5c683" opacity=".15"/>'
branches = [(590, 390, 595, 238, 18), (595, 245, 560, 155, 10), (595, 250, 645, 170, 9), (560, 170, 480, 102, 6), (560, 170, 574, 75, 5), (645, 180, 720, 105, 6), (640, 180, 640, 58, 5), (480, 103, 430, 85, 3), (480, 103, 470, 52, 3), (574, 75, 550, 30, 2), (640, 70, 688, 32, 3), (719, 110, 775, 90, 3), (595, 240, 528, 220, 6), (528, 220, 456, 168, 3)]
for x,y,xx,yy,w in branches:
    tree+=f'<path d="M{x} {y}Q{x+14} {yy+30} {xx} {yy}" fill="none" stroke="#d0bc74" stroke-width="{w}"/>'
for _ in range(180):
    x=random.gauss(605,99);y=random.gauss(130,48)
    tree+=f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{random.randrange(2,6)}" ry="2" fill="#dbc77b" opacity="{random.uniform(.2,.65):.2f}"/>'
tree+='<path d="M0 360 160 280 260 360 410 310 530 390 680 340 900 390v170H0z" fill="#334236"/><path d="M0 430 250 370 420 450 900 405v155H0" fill="#182c26"/><path d="M90 405V140Q190 25 290 140v265h-32V155Q190 69 122 155v250z" fill="#25372e"/><path d="M105 410V145Q190 49 275 145v265" fill="none" stroke="#70815b" stroke-width="3"/><path d="M66 410h245v22H66zM80 133h55v20H80zM247 133h55v20h-55z" fill="#46533c"/><path d="M0 510 900 460v100H0" fill="#0b201a"/><path d="M450 468l-11 46h30l-9-46-5-7z" fill="#050e0c"/><circle cx="455" cy="457" r="7" fill="#050e0c"/><path d="M469 472l17 38" stroke="#c2bf8a" stroke-width="2"/>'
save('elden-ring','#777954','#233d32',tree)

# A ritual gate reflected in the river of the underworld.
under='<circle cx="450" cy="180" r="110" fill="#cdb68d" opacity=".8"/><circle cx="488" cy="160" r="100" fill="#544350"/><ellipse cx="450" cy="280" rx="350" ry="230" fill="url(#light)"/>'
for x in [110,230,630,750]:
    under+=f'<path d="M{x} 430V170h35v260z" fill="#251f35"/><path d="M{x-9} 159h53v20h-53zM{x-5} 414h45v18h-45z" fill="#655067"/><path d="M{x+8} 185v215" stroke="#b38e87" opacity=".35"/>'
under+='<path d="M290 430V240Q450 38 610 240v190h-24V248Q450 77 314 248v182z" fill="#e0ad80" opacity=".7"/><path d="M315 430V248Q450 77 585 248v182" fill="none" stroke="#b4dfc0" stroke-width="4"/><path d="M0 410h900v150H0" fill="#192d30"/><path d="M330 425 280 560M570 425l50 135M342 447h215M324 475h245M307 509h280M291 548h307" stroke="#8bbbad" opacity=".35" stroke-width="2"/><path d="M427 411l-14 49 23-9 4 36h19l3-37 24 10-16-48-20-11z" fill="#111c26"/><circle cx="449" cy="389" r="12" fill="#111c26"/><path d="M475 417l28 66M501 474l-2-30 16-7" fill="none" stroke="#b8e9cd" stroke-width="3"/><path d="M0 60 55 210 24 330 80 460 0 560zM900 20 850 150 880 320 830 470 900 560z" fill="#201c2a"/>'
save('hades','#57364d','#9f665c',under)

# Luminous underground grove, hanging roots and a tiny horned silhouette.
cave='<ellipse cx="470" cy="265" rx="320" ry="270" fill="#5d92a0" opacity=".25"/><circle cx="470" cy="275" r="110" fill="#acd5d5" opacity=".3"/>'
for x in [60,170,300,600,730,850]:
    cave+=f'<path d="M{x} 0Q{x-55} 190 {x+5} 440" fill="none" stroke="#172c3b" stroke-width="{random.randrange(20,50)}"/><path d="M{x} 110q50 0 70-80M{x} 210q-55-15-70-90" fill="none" stroke="#172c3b" stroke-width="12"/>'
cave+='<path d="M0 450Q160 345 300 438T600 443T900 401v159H0" fill="#102635"/><path d="M0 499Q200 425 430 480T900 470V560H0" fill="#091b29"/>'
for _ in range(55):
    x=random.randrange(60,850);y=random.randrange(175,470)
    cave+=f'<circle cx="{x}" cy="{y}" r="{random.choice([1,2,3])}" fill="#c1e4dc" opacity="{random.uniform(.25,.85):.2f}"/>'
cave+='<path d="M424 454l-8 34 22-6 14 6-5-34z" fill="#0b1425"/><path d="M423 435q-4-16-1-28l9 15q9-4 15 0l9-16q3 17-2 29v13q-15 12-29 0z" fill="#d8e5df"/><ellipse cx="431" cy="437" rx="3" ry="4" fill="#1c3640"/><ellipse cx="446" cy="437" rx="3" ry="4" fill="#1c3640"/><path d="M455 461l27 17" stroke="#b9d6d8" stroke-width="3"/>'
save('hollow-knight','#21354b','#416775',cave)

# Planetary eclipse and orbital paths over an alien desert.
space='<defs><radialGradient id="planet" cx=".25" cy=".2"><stop stop-color="#e4c5a5"/><stop offset=".45" stop-color="#9d8178"/><stop offset="1" stop-color="#2c3549"/></radialGradient></defs><circle cx="570" cy="210" r="172" fill="url(#planet)"/><path d="M407 142q145 95 316 7M401 175q149 106 329 16M402 225q145 97 328 16M424 295q140 66 286 1" fill="none" stroke="#d4b39d" stroke-width="9" opacity=".18"/><ellipse cx="570" cy="210" rx="290" ry="55" transform="rotate(-24 570 210)" fill="none" stroke="#b8aea2" stroke-width="9" opacity=".6"/><ellipse cx="570" cy="210" rx="309" ry="61" transform="rotate(-24 570 210)" fill="none" stroke="#b8aea2" stroke-width="2" opacity=".35"/><circle cx="240" cy="115" r="23" fill="#b9c4ca" opacity=".7"/><path d="M0 400 190 330 370 440 570 350 900 440v120H0" fill="#55535b"/><path d="M0 470 200 410 400 480 730 405 900 466v94H0" fill="#292e3a"/><path d="M0 515 250 460 490 530 900 490v70H0" fill="#151f2c"/><path d="M310 445l-4 32h19l-2-32z" fill="#d1c8bd"/><circle cx="316" cy="438" r="8" fill="#c4c5c0"/><path d="M311 436h10v5h-10z" fill="#2b3544"/><path d="M327 448l11-11M339 437v45" stroke="#bcbab0" stroke-width="2"/>'
save('starfield','#172639','#7a6969',space)
