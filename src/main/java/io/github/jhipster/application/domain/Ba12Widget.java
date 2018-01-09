package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ba12Widget.
 */
@Entity
@Table(name = "ba_12_widget")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ba12Widget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 1024)
    @Column(name = "de_options", length = 1024)
    private String deOptions;

    @Size(max = 100)
    @Column(name = "db_titolo", length = 100)
    private String dbTitolo;

    @Size(max = 1024)
    @Column(name = "de_content", length = 1024)
    private String deContent;

    @ManyToOne
    private Ba11Dsh ba11Dsh;

    @ManyToOne
    private Ba11Dsh dashboard;

    @ManyToOne
    private Ind12Query query;

    @ManyToOne
    private TipiWidget widgetType;

    @ManyToOne
    private Ind12Query ind12Query;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeOptions() {
        return deOptions;
    }

    public Ba12Widget deOptions(String deOptions) {
        this.deOptions = deOptions;
        return this;
    }

    public void setDeOptions(String deOptions) {
        this.deOptions = deOptions;
    }

    public String getDbTitolo() {
        return dbTitolo;
    }

    public Ba12Widget dbTitolo(String dbTitolo) {
        this.dbTitolo = dbTitolo;
        return this;
    }

    public void setDbTitolo(String dbTitolo) {
        this.dbTitolo = dbTitolo;
    }

    public String getDeContent() {
        return deContent;
    }

    public Ba12Widget deContent(String deContent) {
        this.deContent = deContent;
        return this;
    }

    public void setDeContent(String deContent) {
        this.deContent = deContent;
    }

    public Ba11Dsh getBa11Dsh() {
        return ba11Dsh;
    }

    public Ba12Widget ba11Dsh(Ba11Dsh ba11Dsh) {
        this.ba11Dsh = ba11Dsh;
        return this;
    }

    public void setBa11Dsh(Ba11Dsh ba11Dsh) {
        this.ba11Dsh = ba11Dsh;
    }

    public Ba11Dsh getDashboard() {
        return dashboard;
    }

    public Ba12Widget dashboard(Ba11Dsh ba11Dsh) {
        this.dashboard = ba11Dsh;
        return this;
    }

    public void setDashboard(Ba11Dsh ba11Dsh) {
        this.dashboard = ba11Dsh;
    }

    public Ind12Query getQuery() {
        return query;
    }

    public Ba12Widget query(Ind12Query ind12Query) {
        this.query = ind12Query;
        return this;
    }

    public void setQuery(Ind12Query ind12Query) {
        this.query = ind12Query;
    }

    public TipiWidget getWidgetType() {
        return widgetType;
    }

    public Ba12Widget widgetType(TipiWidget tipiWidget) {
        this.widgetType = tipiWidget;
        return this;
    }

    public void setWidgetType(TipiWidget tipiWidget) {
        this.widgetType = tipiWidget;
    }

    public Ind12Query getInd12Query() {
        return ind12Query;
    }

    public Ba12Widget ind12Query(Ind12Query ind12Query) {
        this.ind12Query = ind12Query;
        return this;
    }

    public void setInd12Query(Ind12Query ind12Query) {
        this.ind12Query = ind12Query;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ba12Widget ba12Widget = (Ba12Widget) o;
        if (ba12Widget.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ba12Widget.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ba12Widget{" +
            "id=" + getId() +
            ", deOptions='" + getDeOptions() + "'" +
            ", dbTitolo='" + getDbTitolo() + "'" +
            ", deContent='" + getDeContent() + "'" +
            "}";
    }
}
